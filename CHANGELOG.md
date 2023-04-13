# 1.6.3

- fix: join paths correctly on windows #21
- fix: ignore some pipe errors we cannot do anything about

# 1.6.2

- fix: re-release

# 1.6.1

- fix: improved error message when swiftformat is missing

# 1.6.0

- docs: clarified `swiftformat.options` #17
- Added: `swiftformat.path` can now be an array of strings and defaults to `[/usr/bin/env, swiftformat]` #17

# 1.5.1

- fix: on Linux, must also be linked

# 1.5.0

- Added: build SwiftFormat if needed

# 1.4.0

- Added: `swiftformat.onlyEnableWithConfig` to only enable SwiftFormat with a config #20
- Fixed: `swiftformat.onlyEnableOnSwiftPMProjects` didn't work correctly

# 1.3.10

- Fixed: `vsce publish` didn't rebuild the extension #19

# 1.3.9

- Fixed: accidentially always added `--header "// Created {created}"` #19

# 1.3.8

- Fixed: failed to apply `--header` option #18

# 1.3.7

- [CVE-2021-28791](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-28791): Fixes vulnerability which allowed malicous workspaces to execute code when opened by providing. Now the vulnerable configs cannot be overrided in workspaces anymore: `swiftformat.path`. Reported by [@Ry0taK](https://github.com/Ry0taK).

# 1.3.6

- Fixed: `swiftformat.options` were not always respected vknabel/vscode-swiftlint#14 - [@vknabel](https://github.com/vknabel/)

# 1.3.5

- Fixed: `configSearchPaths` did not support `~` vknabel/vscode-swiftlint#8 - [@vknabel](https://github.com/vknabel/)

# 1.3.4

- End of newline was always stripped. #13 - [@vknabel](https://github.com/vknabel/)

# 1.3.3

- Introduced extension logo. - [@vknabel](https://github.com/vknabel/)
- Added notice to disambiguate. - [@vknabel](https://github.com/vknabel/)

# 1.3.2

- Removed missing linux support warning as it [is officially supported now](https://github.com/nicklockwood/SwiftFormat/issues/240#issuecomment-458776216). #9 - thanks to [@cgarciae](https://github.com/cgarciae/)

# 1.3.1

- Formatting new files lead to an error. #6 - [@vknabel](https://github.com/vknabel/)

# 1.3.0

- Automatically load SwiftFormat config files. #5 - [@vknabel](https://github.com/vknabel/)

# 1.2.2

- Documents not opened in workspaces lead to a crash. #3 - [@vknabel](https://github.com/vknabel/)
- Missing `break` within switch statement lead to reporting explicitly handled issues #4 - [@vknabel](https://github.com/vknabel/)

# 1.2.1

- Prefers release over debug builds of SwiftFormat - [@segiddins](https://github.com/segiddins)

# 1.2.0

- Supports running on Swift PM projects which have a dependency on SwiftFormat - [@orta](https://github.com/orta/)

# 1.1.3

- Did print help when formatting empty document.

# 1.1.2

- Format selection did not work correctly.
- Had wrong issue reporting url.

# 1.1.1

- SwiftFormat now supports home directories with `~/`

# 1.1.0

- SwiftFormat will now use vscode's indentation settings.
- Unknown errors can now be reported on GitHub.

# 1.0.0

- Initial release
