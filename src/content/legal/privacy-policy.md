---
title: Privacy policy
updated: "2026-05-14"
---

## Overview

AuraShell is a Windows 11 desktop customization utility. This policy describes what system access the app uses, what data it stores, and how you can remove it completely.

**Summary**: AuraShell does not collect, transmit, or sell any personal data. Everything it stores stays on your local machine.

---

## What System Access AuraShell Uses

| Access | Purpose | Required? |
|---|---|---|
| WASAPI audio loopback | Capture system audio for the real-time audio visualizer | Optional (visualizer feature only) |
| Win32 window enumeration | Detect taskbar and desktop window handles for animations | Yes |
| Registry (`HKCU\Software\AuraShell`) | Store your customization preferences and theme settings | Yes |
| File system (`%LOCALAPPDATA%\AuraShell\`) | Store config files, logs, and theme cache | Yes |
| Named pipe IPC | Communication between the main app and the optional elevated service | Optional (service feature only) |
| Optional elevated service (`AuraShellService.exe`) | Apply system-level shell modifications that require admin privileges | Optional |

AuraShell does **not**:
- Access the internet or make any network connections
- Read your files, documents, or personal data
- Record audio for any purpose other than real-time visualization (audio is never saved to disk)
- Transmit any data to the developer or any third party

---

## What Data Is Stored Locally

All data stored by AuraShell lives in two locations on your computer:

**`%LOCALAPPDATA%\AuraShell\`**
- `config.json` — Your settings and preferences (theme, feature toggles, window positions)
- `themes\` — Theme files you have applied or downloaded
- `logs\aurashell.log` — Application logs for debugging (rotated, max 50 MB total). Logs contain timestamps, feature events, and error codes — no personal information.

**`HKCU\Software\AuraShell`** (Windows Registry)
- Shortcut icon paths and taskbar customization state
- These values are backed up before modification and can be restored via the app's "Restore Defaults" feature or by uninstalling

---

## How to Remove All Data

### Using the Uninstaller (recommended)
Run the AuraShell uninstaller from Settings → Apps or the Start Menu shortcut. It will remove all registry keys and application files.

### Manual removal
1. Delete `%LOCALAPPDATA%\AuraShell\` (the entire folder)
2. Open Registry Editor and delete `HKEY_CURRENT_USER\Software\AuraShell`

---

## Children's Privacy

AuraShell does not knowingly collect any information from children under 13. The app contains no user accounts, sign-in flows, or data submission of any kind.

---

## Changes to This Policy

If this policy changes materially, the updated version will be posted to the AuraShell website with a new "Last updated" date. Given that AuraShell does not collect user contact information, we cannot notify users directly.

---

## Contact

Questions about this privacy policy? Open an issue on GitHub or email the developer.

**GitHub**: https://github.com/Iajensen222222/AuraShell  
**Email**: iajensen@icloud.com
