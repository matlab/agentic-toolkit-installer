# Agentic Toolkit Installer

Run MATLAB® and Simulink® with AI coding agents. This installer sets up everything you need to get started, including:
- [MATLAB Agentic Toolkit (GitHub)](https://github.com/matlab/matlab-agentic-toolkit) — provides agent skills for MATLAB
- [Simulink Agentic Toolkit (GitHub)](https://github.com/matlab/simulink-agentic-toolkit) — provides agent skills for Simulink
- [MATLAB MCP Server (GitHub)](https://github.com/matlab/matlab-mcp-server) — connects agents to MATLAB and Simulink

## Table of Contents

- [Requirements](#requirements)
- [Download the Installer](#download-the-installer)
- [Get Started](#get-started)
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

- Supported platforms:
  - Windows (x64)
  - Linux (x64)
  - macOS (Intel or Apple Silicon)

## Download the Installer

<details>
<summary><b>Windows (x64)</b></summary>

Download [`agentic-toolkit-installer-windows-x64.exe` (GitHub)](https://github.com/matlab/agentic-toolkit-installer/releases/latest/download/agentic-toolkit-installer-windows-x64.exe).

Rename the file to:

```text
agentic-toolkit-installer.exe
```

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
> **Simulink users:** If you previously used Simulink Agentic Toolkit with a custom `startup.m` file, remove these commands from the file:<br>`addpath(fullfile(getenv('USERPROFILE'), '.matlab', 'agentic-> toolkits', 'simulink'))`<br>`satk_initialize`


Run the installer:

```
# Windows
.\agentic-toolkit-installer.exe install

# Linux/macOS
./agentic-toolkit-installer install
```

The installer asks you questions to configure your coding agents with settings including skills, scopes, and MCP settings. 

When the installer finishes, restart your agents to begin using them with MATLAB and Simulink. 

You can also:

- See a summary of your configuration: `.\agentic-toolkit-installer.exe status`
- Make changes to your configuration: `.\agentic-toolkit-installer.exe configure`
- Uninstall your configuration: `.\agentic-toolkit-installer.exe uninstall`
- Update the installer to get the latest binary with fixes and enhancements: `.\agentic-toolkit-installer.exe install`

For advanced usage, see the next section. 

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

When both a system directory file and a CLI flag are present, the CLI flag takes precedence.

The system directory is optional. The installer functions without it.
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
| `--proxy <path>` | System directory if available, otherwise none | Specify path to proxy definition file. For details, see the `system-dir` flag in [Global Options](#global-options). |
| `--git-token <token>` | System directory if available, otherwise none | Provide personal access token for authenticated access (for using private repositories or bypassing public rate limits). MathWorks recommends you read the token from a file instead of entering the value in the terminal. For more details, see [Authenticate with Private Repositories](#authenticate-with-private-repositories). |
| `--registry <path>` | [`registry.yaml`](https://github.com/matlab/agentic-toolkit-installer/blob/main/internal/adaptors/registry/registry.yaml) file located at `internal/adaptors/registry/registry.yaml` in this repository.  | Specify path to a custom registry file, which tells the installer about where to get the toolkits from. For information about using proxies, see [Configure Proxies and Mirrors](#configure-proxies-and-mirrors). |
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

Show installed toolkits, versions, configured agents, active skill groups, MCP settings, and other options.

```powershell
.\agentic-toolkit-installer.exe status [options]
```

| Option | Default | Description |
|--------|---------|-------------|
| `--verbose` | `false` | Show extended diagnostic information |

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

To download the toolkits from a local mirror, private repository, or filesystem path, create a `proxy.yaml` file:

```yaml
schema-version: 1

toolkits:
  matlab-agentic-toolkit:
    repo: https://git.corp.example.com/matlab-mirror/matlab-agentic-toolkit
    type: git

  simulink-agentic-toolkit:
    repo: /mnt/shared/agentic-toolkits/simulink-agentic-toolkit
    type: filesystem
```

Then pass it during install:

```powershell
.\agentic-toolkit-installer.exe install --proxy proxy.yaml
```

With `type: filesystem`, no network calls are made. The installer reads directly from the local path.

Administrators can place `proxy.yaml` in the system directory for zero-flag enterprise installs. For details of the system directory, see the `system-dir` flag in [Global Options](#global-options).

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
