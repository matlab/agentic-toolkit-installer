// Copyright 2026 The MathWorks, Inc.
const { marked } = require("marked");
const { issueClosedComment } = require("./messages");

// A paragraph is treated as a "header-style" line (i.e. a section divider)
// when its trimmed text is a short title with no issue refs or URLs --
// e.g. "Enhancements" or "Issues Resolved" typed without '##' in the
// GitHub release editor.
function isHeaderLikeParagraph(token) {
    if (token.type !== "paragraph") {
        return false;
    }
    const text = token.text.trim();
    return (
        text.length > 0 &&
        text.length <= 60 &&
        !/\n/.test(text) &&
        !/#\d/.test(text) &&
        !/https?:\/\//i.test(text) &&
        /^[A-Za-z][A-Za-z0-9 '/-]*$/.test(text)
    );
}

function isIssuesResolvedSectionStart(token) {
    if (token.type === "heading" && /issues resolved/i.test(token.text)) {
        return { depth: token.depth, kind: "heading" };
    }
    if (isHeaderLikeParagraph(token) && /^issues resolved$/i.test(token.text.trim())) {
        return { depth: 0, kind: "paragraph" };
    }
    return null;
}

function extractIssueNumbers(releaseBody) {
    const tokens = marked.lexer(releaseBody);
    const issueNumbers = [];
    let inSection = false;
    let sectionDepth = 0;
    let sectionKind = null;

    for (const token of tokens) {
        const start = isIssuesResolvedSectionStart(token);
        if (start) {
            inSection = true;
            sectionDepth = start.depth;
            sectionKind = start.kind;
            continue;
        }
        if (inSection && token.type === "heading" && token.depth <= sectionDepth) {
            break;
        }
        if (inSection && sectionKind === "paragraph" && isHeaderLikeParagraph(token)) {
            break;
        }
        if (inSection) {
            for (const match of token.raw.matchAll(/(?<![/\w])#(\d+)/g)) {
                issueNumbers.push(parseInt(match[1], 10));
            }
        }
    }

    return [...new Set(issueNumbers)];
}

async function closeIssue({ github, owner, repo, issueNumber, tag, releaseUrl, core }) {
    const { data: issue } = await github.rest.issues.get({
        owner,
        repo,
        issue_number: issueNumber,
    });

    if (issue.state === "closed") {
        core.info(`Issue #${issueNumber} is already closed, skipping.`);
        return;
    }

    if (issue.pull_request) {
        core.info(`#${issueNumber} is a pull request, skipping.`);
        return;
    }

    await github.rest.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body: issueClosedComment(tag, releaseUrl),
    });

    await github.rest.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        state: "closed",
        state_reason: "completed",
    });

    core.info(`Closed issue #${issueNumber}.`);
}

module.exports = async function closeReferencedIssues({ github, context, core }) {
    const body = context.payload.release.body || "";
    const tag = context.payload.release.tag_name;
    const releaseUrl = context.payload.release.html_url;
    const { owner, repo } = context.repo;

    const issueNumbers = extractIssueNumbers(body);

    if (issueNumbers.length === 0) {
        core.info("No issue references found in release notes.");
        return;
    }

    core.info(`Found issue references: ${issueNumbers.join(", ")}`);

    for (const issueNumber of issueNumbers) {
        try {
            await closeIssue({ github, owner, repo, issueNumber, tag, releaseUrl, core });
        } catch (e) {
            if (e.status === 404) {
                core.warning(`Issue #${issueNumber} not found, skipping.`);
            } else {
                core.warning(`Failed to close #${issueNumber}: ${e.message}`);
            }
        }
    }
}

module.exports.extractIssueNumbers = extractIssueNumbers;
module.exports.closeIssue = closeIssue;
