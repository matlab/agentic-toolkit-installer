# Agentic Toolkit Installer

Run MATLAB® and Simulink® with AI coding agents. This installer sets up everything you need to get started, including:
- [MATLAB Agentic Toolkit (GitHub)](https://github.com/matlab/matlab-agentic-toolkit) — provides agent skills for MATLAB
- [Simulink Agentic Toolkit (GitHub)](https://github.com/matlab/simulink-agentic-toolkit) — provides agent skills for Simulink
- [MATLAB MCP Server (GitHub)](https://github.com/matlab/matlab-mcp-server) — connects agents to MATLAB and Simulink

## Table of Contents

- [Requirements](#requirements)
- [Download the Installer](#download-the-installer)
- [Get Started](#get-started)
- [Update the Installer and Toolkits](#update-the-installer-and-toolkits)
- [Advanced Usage](#advanced-usage)
  - [Command Reference](#command-reference)
  - [Run Programmatically](#run-programmatically)
  - [Pin Toolkit Versions](#pin-toolkit-versions)
  - [Use Environment Variables](#use-environment-variables)
  - [Configure Proxies and Mirrors](#configure-proxies-and-mirrors)
  - [Authenticate with Private Repositories](#authenticate-with-private-repositories)
- [Known Issues and Limitations](#known-issues-and-limitations)
- [Data Collection](#data-collection)
- [Security Considerations](#security-considerations)
- [Licensing and Usage](#licensing-and-usage)
- [Contact Support](#contact-support)

## Requirements

- Supported versions of MATLAB:
  - To use both MATLAB and Simulink: [MATLAB R2023a or later (MathWorks)](https://www.mathworks.com/help/install/ug/install-products-with-internet-connection.html).
  - To use only MATLAB: [MATLAB R2021a or later (MathWorks)](https://www.mathworks.com/help/install/ug/install-products-with-internet-connection.html).

- One or more supported AI coding agents:
  - [OpenAI Codex](https://openai.com/codex/)
  - [Claude Code](https://claude.com/product/claude-code)
  - [GitHub Copilot CLI](https://github.com/features/copilot) or [GitHub Copilot in Visual Studio Code](https://code.visualstudio.com/docs/setup/copilot). Note: if you previously ran the Installer `v0.3.0` or earlier, then to configure GitHub Copilot for the first time you must do a fresh install of the Installer. Run [`uninstall`](#uninstall), then [`install`](#install) to configure GitHub Copilot.
- Supported platforms:
  - Windows (x64)
  - Linux (x64)
  - macOS (Intel or Apple Silicon)

## Download the Installer

<details>
<summary><b>Windows (x64)</b></summary>

Download [`agentic-toolkit-installer.exe` (GitHub)](https://github.com/matlab/agentic-toolkit-installer/releases/latest/download/agentic-toolkit-installer.exe).

</details>

<details>
<summary><b>Linux (x64)</b></summary>

#### From Terminal

```bash
curl -L -o agentic-toolkit-installer https://github.com/matlab/agentic-toolkit-installer/releases/latest/download/agentic-toolkit-installer-linux-x64 && chmod +x agentic-toolkit-installer
```

#### Or Direct Download

Download [`agentic-toolkit-installer-linux-x64` (GitHub)](https://github.com/matlab/agentic-toolkit-installer/releases/latest/download/agentic-toolkit-installer-linux-x64).


Rename the file to `agentic-toolkit-installer` and grant executable permissions:

```bash
chmod +x agentic-toolkit-installer
```

</details>

<details>
<summary><b>macOS (Intel)</b></summary>

#### From Terminal

```bash
curl -L -o agentic-toolkit-installer https://github.com/matlab/agentic-toolkit-installer/releases/latest/download/agentic-toolkit-installer-macos-x64 && chmod +x agentic-toolkit-installer
```

#### Or Direct Download

Download [`agentic-toolkit-installer-macos-x64` (GitHub)](https://github.com/matlab/agentic-toolkit-installer/releases/latest/download/agentic-toolkit-installer-macos-x64).

Rename the file to `agentic-toolkit-installer` and grant executable permissions:

```bash
chmod +x agentic-toolkit-installer
```

</details>

<details>
<summary><b>macOS (Apple Silicon)</b></summary>

#### From Terminal

```bash
curl -L -o agentic-toolkit-installer https://github.com/matlab/agentic-toolkit-installer/releases/latest/download/agentic-toolkit-installer-macos-arm64 && chmod +x agentic-toolkit-installer
```

#### Or Direct Download

Download [`agentic-toolkit-installer-macos-arm64` (GitHub)](https://github.com/matlab/agentic-toolkit-installer/releases/latest/download/agentic-toolkit-installer-macos-arm64).

Rename the file to `agentic-toolkit-installer` and grant executable permissions:

```bash
chmod +x agentic-toolkit-installer
```

</details>

## Get Started

> [!IMPORTANT]
> **Simulink users:** If you previously used Simulink Agentic Toolkit with a custom [`startup.m`](https://www.mathworks.com/help/matlab/ref/startup.html) file, remove these commands from the file:<br>`addpath(fullfile(getenv('USERPROFILE'), '.matlab', 'agentic-toolkits', 'simulink'))`<br>`satk_initialize`


Run the installer:

```
# Windows
.\agentic-toolkit-installer.exe install

# Linux/macOS
./agentic-toolkit-installer install
```

Use the installer to configure your coding agents with settings including skills, scopes, and MCP settings. Then restart your agents to begin using them with MATLAB and Simulink. 

To connect your agent to a running MATLAB session, remember to run [`shareMATLABSession()`](https://github.com/matlab/matlab-mcp-server/tree/main#arguments) in that MATLAB session.

You can also:

- See a summary of your configuration: `.\agentic-toolkit-installer.exe status`
- Make changes to your configuration: `.\agentic-toolkit-installer.exe configure`
- Uninstall your configuration: `.\agentic-toolkit-installer.exe uninstall`
- Update the installer or toolkits: for details, see [Update Installer and Toolkits](#update-the-installer-and-toolkits).

For advanced usage, see [Advanced Usage](#advanced-usage).

## Update the Installer and Toolkits

**Update the installer:** To get the latest version of the installer binary, with fixes and enhancements, download it again by following the steps in [Download the Installer](#download-the-installer).

**Update the toolkits:** To get the latest versions of the toolkits, including the MATLAB MCP Server, run `install`: `.\agentic-toolkit-installer.exe install --skip-configure`.

The installer updates any agents you already configured, at user or project scope, to use the updated toolkits. Your existing configuration continues working with the updated toolkits. To add skill groups, run `.\agentic-toolkit-installer.exe configure` afterwards.

To keep a toolkit at a specific version when you update, see [Pin Toolkit Versions](#pin-toolkit-versions).

## Advanced Usage

### Command Reference

You can use the installer with four commands: `install`, `configure`, `status`, and `uninstall`. All commands accept the following global options:

#### Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `--help` | | Show help for any command. For example: `.\agentic-toolkit-installer.exe install --help` |
| `--system-dir <path>` | Default path for your operating system | Override MathWorks system directory root. For details, see [System Directory Details](#system-directory-details). |
| `--app-data <path>` | Default folder for your operating system | Override application data folder. This is where the installer stores downloaded toolkits, configuration state, and MCP server binaries. |
| `--log-level <level>` | `debug` | Set log level. Valid values, in order of decreasing verbosity, are: `debug`, `info`, `warn`, `error` |
| `--log-folder <path>` | Default temporary folder for your operating system | Specify the folder where the installer stores log files. |

<details id="system-directory-details">
<summary><b>System Directory Details</b></summary>

The system directory is a MathWorks-wide location for admin-managed configuration shared across MathWorks tools. To override, use `--system-dir` or the `MATHWORKS_SYSTEM_DIR` environment variable.

**Default Locations:**

| Platform | Default Path |
|----------|--------------|
| Linux | `/etc/mathworks/` |
| macOS | `/Library/Application Support/MathWorks/` |
| Windows | `%PROGRAMDATA%\MathWorks\` |

In the system directory root, the installer looks for its own folder:

| Platform | Installer Folder |
|----------|------------------|
| Linux | `<system-dir>/AgenticToolkits/` |
| macOS | `<system-dir>/Agentic Toolkits/` |
| Windows | `<system-dir>\Agentic Toolkits\` |

**Recognized Files:**

| File | Purpose |
|------|---------|
| `proxy.yaml` | Default proxy definition. Used when `--proxy` is not passed on the command line. |
| `.git-token` | Default authentication token (plain text, single line). Used when `--git-token` is not passed on the command line. |

When you use both a system directory file and a CLI flag, the CLI flag takes precedence.

The system directory is optional. The installer can run without it.
</details>

---
**Each command also accepts its own options:**

#### `install`

Download toolkits and install required MATLAB toolboxes into detected MATLAB installations. Automatically runs `configure` when complete. The command uses default values for options unless you specify custom values.

```powershell
.\agentic-toolkit-installer.exe install [options]
```

| Option | Default | Description |
|--------|---------|-------------|
| `--non-interactive` | `false` | By default, the installer runs interactively. To run the installer programmatically, set this option to `true`. The installer will skip all prompts, use default values for all options except where you specify them as flags, and skip the configure step. For scripted workflows, see [Run Programmatically](#run-programmatically). |
| `--matlab-root <path>` | By default, the installer searches for the first MATLAB on your system path. For macOS, the installer also checks `/Applications` and `~/Applications`. | Specify which MATLAB installation to configure for agents. To specify multiple installations, pass this flag more than once. Do not include `/bin` in the path. |
| `--version <toolkit>=<ver>` | Latest available version | If you do not want to update a particular toolkit when updating the installer, you can pin a toolkit to a specific version. To pin multiple toolkits, pass this flag more than once. For details, see [Pin Toolkit Versions](#pin-toolkit-versions). |
| `--skip-configure` | `false` | Skip the automatic configure step after install. |
| `--proxy <path>` | System directory, if available, otherwise none | Specify path to proxy definition file. For more information about using proxies, see [Configure Proxies and Mirrors](#configure-proxies-and-mirrors). |
| `--git-token <token>` | System directory if available, otherwise none | Provide personal access token for authenticated access (for using private repositories or bypassing public rate limits). MathWorks recommends you read the token from a file instead of entering the value in the terminal. For more details, see [Authenticate with Private Repositories](#authenticate-with-private-repositories). |
| `--disable-telemetry` | `false` | To disable anonymized data collection, set this option to `true`. For details, see [Data Collection](#data-collection). |

#### `configure`

Set up coding agents by registering MCP servers and skill groups. Choose agents, scope, toolkits, and skill groups interactively or programmatically. The command uses default values for options unless you specify custom values.

```powershell
.\agentic-toolkit-installer.exe configure [options]
```

| Option | Default | Description |
|--------|---------|-------------|
| `--non-interactive` | `false` | By default, the installer runs interactively. To run the installer programmatically, set this option to `true`. The installer will skip all prompts, configure all detected agents and installed toolkits, and enable only required skill groups. Use `--skill-group` to enable additional skill groups. For scripted workflows, see [Run Programmatically](#run-programmatically). |
| `--scope <scope>` | `user` | Set scope for agent configuration: `user` (system-wide, available in all projects) or `project` (specific project folder only). You can use both scopes together. Currently, the installer registers MCP servers only at user scope. |
| `--scope-path <path>` | Current folder | Set target folder for `project` scope. Ignored when `--scope` is `user`. |
| `--toolkit <toolkit>` | All installed toolkits | Specify at least one toolkit to activate. To include multiple toolkits, pass this flag more than once. Skips the toolkit selection prompt in interactive mode. |
| `--skill-group <group>` | Required skill groups only | Specify skill group to enable. To include multiple skill groups, pass this flag more than once. Skips the skill group selection prompt in interactive mode. Required skill groups are always included. |

#### `status`

Show installed toolkits, MCP servers, MATLAB installations, and configured agents with their skill groups.

```powershell
.\agentic-toolkit-installer.exe status
```

#### `uninstall`

Remove all toolkits, agent configurations, MATLAB toolboxes, and the app data folder.

```powershell
.\agentic-toolkit-installer.exe uninstall
```

| Option | Default | Description |
|--------|---------|-------------|
| `--non-interactive` | `false` | By default, the installer runs interactively. To run the installer programmatically, set this option to `true`. The installer will remove all installed artifacts without prompting for confirmation. |

### Run Programmatically

For scripted or CI/CD workflows, pass `--non-interactive` and provide all selections as flags:

```bash
# Linux and macOS. For Windows, use .\agentic-toolkit-installer.exe and PowerShell syntax.
./agentic-toolkit-installer install \
  --non-interactive \
  --matlab-root /usr/local/MATLAB/R2026a \
  --version matlab-agentic-toolkit=2026.05.21 \
  --skip-configure

./agentic-toolkit-installer configure \
  --non-interactive \
  --scope user \
  --toolkit matlab-agentic-toolkit \
  --skill-group parallel-computing \
  --skill-group signal-processing
```

In non-interactive mode, if you do not specify `--toolkit`, all toolkits are configured. If you do not specify `--skill-group`, the installer installs only required skill groups for the specified toolkits.

### Pin Toolkit Versions

Pin specific toolkit versions instead of installing the latest:

```bash
# Linux and macOS. For Windows, use .\agentic-toolkit-installer.exe and PowerShell syntax.
./agentic-toolkit-installer install \
  --version matlab-agentic-toolkit=2026.05.21 \
  --version simulink-agentic-toolkit=2026.05.07
```

Omitting `--version` for a toolkit installs the latest release.

### Use Environment Variables

To specify a CLI option as an environment variable, prefix with `MW_AGENTIC_TOOLKIT_INSTALLER_` and convert to uppercase with underscores:

```bash
# Linux and macOS syntax.
# --log-level becomes:
MW_AGENTIC_TOOLKIT_INSTALLER_LOG_LEVEL=debug

# --matlab-root becomes:
MW_AGENTIC_TOOLKIT_INSTALLER_MATLAB_ROOT=/usr/local/MATLAB/R2026a
```

CLI flags take precedence over environment variables.

**Exception:** `--system-dir` maps to `MATHWORKS_SYSTEM_DIR` (not `MW_AGENTIC_TOOLKIT_INSTALLER_SYSTEM_DIR`) because the system directory is a MathWorks-wide convention shared across products.

### Configure Proxies and Mirrors

To install from a mirror or from local files instead of GitHub, create a `proxy.yaml` file and pass it with `--proxy`. Administrators can alternatively place `proxy.yaml` in the [system directory](#system-directory-details).

```powershell
.\agentic-toolkit-installer.exe install --proxy proxy.yaml
```

The installer always installs all three toolkits. List each toolkit and specify its `repo`, otherwise it is installed from GitHub.

**Git mirror:** If your mirror has the same tags and release assets as GitHub (for example, GitHub Enterprise), you only need to specify `repo`. The `type` defaults to `git`. You can specify the `source` as either an explicit URL or by using placeholders for string interpolation, for example `<repo>/releases/download/<version>/simulink-agentic-toolkit.mltbx`.  For authenticating private mirrors, see [Authenticate with Private Repositories](#authenticate-with-private-repositories). 

```yaml
schema_version: 1

toolkits:
  matlab-agentic-toolkit:
    repo: "https://git.corp.example.com/mirror/matlab-agentic-toolkit"

  simulink-agentic-toolkit:
    repo: "https://git.corp.example.com/mirror/simulink-agentic-toolkit"
    matlab-packages:
      - name: simulink-agentic-toolkit
        source: "https://git.corp.example.com/mirror/binaries/simulink-agentic-toolkit.mltbx"

  matlab-mcp-server:
    repo: "https://git.corp.example.com/mirror/matlab-mcp-server"
    mcp-servers:
      - name: matlab
        binary:
          windows_x64: "https://git.corp.example.com/mirror/binaries/matlab-mcp-server-windows-x64.exe"
          linux_x64: "https://git.corp.example.com/mirror/binaries/matlab-mcp-server-linux-x64"
          macos_arm64: "https://git.corp.example.com/mirror/binaries/matlab-mcp-server-macos-arm64"
          macos_x64: "https://git.corp.example.com/mirror/binaries/matlab-mcp-server-macos-x64"
```

**Local files:** With `type: filesystem`, the installer uses the folder exactly as it is on disk, even if it is a git clone, so check out the release tag you want first. Using `--version` does not change which files are installed, and using `type: git` with a local path is not supported.

You must also specify the release artifacts each toolkit needs:

1. Download the files listed under `mcp-servers` and `matlab-packages` in the `manifest.yaml` file of each toolkit:
- [MATLAB MCP Server Manifest (GitHub)](https://github.com/matlab/matlab-mcp-server/blob/main/manifest.yaml)
- [MATLAB Agentic Toolkit Manifest (GitHub)](https://github.com/matlab/matlab-agentic-toolkit/blob/main/manifest.yaml)
- [Simulink Agentic Toolkit Manifest (GitHub)](https://github.com/matlab/simulink-agentic-toolkit/blob/main/manifest.yaml)
2. Reference them by the same `name`. The `source` values can be local paths or `https://` URLs.
3. For the MCP server binaries, specify paths for all four platforms: `linux_x64`, `macos_x64`, `macos_arm64`, and `windows_x64`.
  
```yaml
schema_version: 1

toolkits:
  matlab-agentic-toolkit:
    repo: "C:/agentic-toolkits/matlab-agentic-toolkit"
    type: filesystem

  simulink-agentic-toolkit:
    repo: "C:/agentic-toolkits/simulink-agentic-toolkit"
    type: filesystem
    matlab-packages:
      - name: simulink-agentic-toolkit
        source: "C:/agentic-toolkits/binaries/simulink-agentic-toolkit.mltbx"

  matlab-mcp-server:
    repo: "C:/agentic-toolkits/matlab-mcp-server"
    type: filesystem
    mcp-servers:
      - name: matlab
        binary:
          windows_x64: "C:/agentic-toolkits/binaries/matlab-mcp-server-windows-x64.exe"
          linux_x64: "C:/agentic-toolkits/binaries/matlab-mcp-server-linux-x64"
          macos_arm64: "C:/agentic-toolkits/binaries/matlab-mcp-server-macos-arm64"
          macos_x64: "C:/agentic-toolkits/binaries/matlab-mcp-server-macos-x64"
    matlab-packages:
      - name: matlab-mcp-server
        source: "C:/agentic-toolkits/binaries/MATLABMCPServerToolbox.mltbx"
```

### Authenticate with Private Repositories

To access private or enterprise repositories, or to avoid GitHub rate limits, provide a personal access token with sufficient read permissions.

To avoid exposing the token, read it from a file instead of pasting it directly into the command. Administrators can place a `.git-token` file in the system directory. For details of the system directory, see the `system-dir` flag in [Global Options](#global-options).

```bash
# Linux and macOS. For Windows, use .\agentic-toolkit-installer.exe and PowerShell syntax.
./agentic-toolkit-installer install \
  --proxy ./proxy.yaml \
  --git-token "$(cat ./.git-token)"
```

## Known Issues and Limitations

- On Windows, `--help` output displays folder paths with escaped backslashes (`\\`) instead of single backslashes.
- With `type: filesystem` in `proxy.yaml`, `--version` does not change which toolkit files are installed. The installer uses the folder as it is.
- If you re-run `install` with a registry that no longer includes a previously installed toolkit, the installer does not remove that toolkit's artifacts.
- The installer always registers MCP server entries at user scope, regardless of the `--scope` flag. The installer does not yet support project-scope MCP server registration.
- The installer does not correctly update the `status` configuration summary if you configure your agents manually.
- The installer might time out if your system takes too long to run MATLAB during setup.
- Uninstall attempts to remove MATLAB toolboxes only from detected MATLAB installations, not from all installations that were originally configured.

## Data Collection

The Agentic Toolkit Installer may collect fully anonymized information about your usage of the installer and MATLAB MCP Server and send it to MathWorks. This data collection helps MathWorks improve products and is on by default. To opt out of data collection, set the flag `--disable-telemetry` to `true`. Your specified setting will persist for subsequent sessions until you change it.

## Security Considerations

When using the MATLAB Agentic Toolkit, Simulink Agentic Toolkit, and MATLAB MCP Server, thoroughly review and validate all tool calls before you run them. Always keep a human in the loop for important actions and only proceed once you are confident the call will do exactly what you expect. For more information, see [User Interaction Model (MCP)](https://modelcontextprotocol.io/specification/latest/server/tools#user-interaction-model) and [Security Considerations (MCP)](https://modelcontextprotocol.io/specification/latest/server/tools#security-considerations).

## Licensing and Usage

The license is available in the [LICENSE.md](LICENSE.md) file in this GitHub repository.

MCP servers are only permitted to be used with MATLAB in accordance with the MathWorks&reg; Software License Agreement, and must not be shared by multiple users. Contact MathWorks if you need to support shared or centralized server use.

## Contact Support

MathWorks encourages you to use this repository and provide feedback. To request technical support or submit an enhancement request, [create a GitHub issue](https://github.com/matlab/agentic-toolkit-installer/issues) or contact [MathWorks Technical Support](https://www.mathworks.com/support/contact_us.html).

---

Copyright 2026 The MathWorks, Inc.
