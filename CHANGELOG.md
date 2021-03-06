# 1.3.7

Fixes vulnerability which allowed malicous workspaces to execute code when opened by providing. Now the vulnerable configs cannot be overrided in workspaces anymore: `swiftformat.path`. Reported by [@Ry0taK](https://github.com/Ry0taK).

# 1.3.6

* Fixed: `swiftformat.options` were not always respected vknabel/vscode-swiftlint#14 - [@vknabel](https://github.com/vknabel/)

# 1.3.5

* Fixed: `configSearchPaths` did not support `~` vknabel/vscode-swiftlint#8 - [@vknabel](https://github.com/vknabel/)

# 1.3.4

* End of newline was always stripped. #13 - [@vknabel](https://github.com/vknabel/)

# 1.3.3

* Introduced extension logo. - [@vknabel](https://github.com/vknabel/)
* Added notice to disambiguate. - [@vknabel](https://github.com/vknabel/)

# 1.3.2

* Removed missing linux support warning as it [is officially supported now](https://github.com/nicklockwood/SwiftFormat/issues/240#issuecomment-458776216). #9 - thanks to [@cgarciae](https://github.com/cgarciae/)

# 1.3.1

* Formatting new files lead to an error. #6 - [@vknabel](https://github.com/vknabel/)

# 1.3.0

* Automatically load SwiftFormat config files. #5 - [@vknabel](https://github.com/vknabel/)

# 1.2.2

* Documents not opened in workspaces lead to a crash. #3 - [@vknabel](https://github.com/vknabel/)
* Missing `break` within switch statement lead to reporting explicitly handled issues #4 - [@vknabel](https://github.com/vknabel/)

# 1.2.1

* Prefers release over debug builds of SwiftFormat - [@segiddins](https://github.com/segiddins)

# 1.2.0

* Supports running on Swift PM projects which have a dependency on SwiftFormat - [@orta](https://github.com/orta/)

# 1.1.3

* Did print help when formatting empty document.

# 1.1.2

* Format selection did not work correctly.
* Had wrong issue reporting url.

# 1.1.1

* SwiftFormat now supports home directories with `~/`

# 1.1.0

* SwiftFormat will now use vscode's indentation settings.
* Unknown errors can now be reported on GitHub.

# 1.0.0

* Initial release
