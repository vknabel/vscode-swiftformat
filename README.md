# SwiftFormat for VS Code

Prettify your Swift code automatically via [SwiftFormat](https://github.com/nicklockwood/SwiftFormat). You can
use SwiftFormat installed globally or via the Swift Package Manager.

> There are two formatters for Swift code. Use this extension if you wish to use [nicklockwood/SwiftFormat](https://github.com/nicklockwood/SwiftFormat).
> Use [apple-swift-format](https://github.com/vknabel/vscode-apple-swift-format) if you want to use [apple/swift-format](https://github.com/apple/swift-format).

### Global Installation

You can [install](https://github.com/nicklockwood/SwiftFormat#how-do-i-install-it) SwiftFormat globally using [Homebrew](http://brew.sh/) or [Mint](https://github.com/yonaskolb/Mint)

```bash
# Using Homebrew
$ brew update && brew install swiftformat
# Using Mint
$ mint install nicklockwood/SwiftFormat
```

### Local Installation

Add the package to your dependencies in `Package.swift`:

```diff
// swift-tools-version:4.2

import PackageDescription

let package = Package(
    name: "Komondor",
    products: [ ... ],
    dependencies: [
        // My dependencies
        .package(url: "https://github.com/orta/PackageConfig.git", from: "0.0.1"),
        // Dev deps
        .package(url: "https://github.com/orta/Komondor.git", from: "0.0.1"),
+        .package(url: "https://github.com/nicklockwood/SwiftFormat.git", from: "0.35.8"),
    ],
    targets: [...]
)
```

## Configuration

| Config                                    | Type       | Default            | Description                                                                                |
| ----------------------------------------- | ---------- | ------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `swiftformat.enable`                      | `Bool`     | `true`             | Whether SwiftFormat should actually do something.                                          |
| `swiftformat.onlyEnableOnSwiftPMProjects` | `Bool`     | `false`            | Requires and uses a SwiftFormat as SwiftPM dependency.                                     |
| `swiftformat.onlyEnableWithConfig`        | `Bool`     | `false`            | Only format if config present.                                                             |
| `swiftformat.path`                        | `[String]  | String`            | `swiftformat`                                                                              | The location of the globally installed SwiftFormat (resolved with the current path if only a filename). |
| `swiftformat.options`                     | `[String]` | `[]`               | Additional [options for SwiftFormat](https://github.com/nicklockwood/SwiftFormat#options). |
| `swiftformat.configSearchPaths`           | `[String]` | `[".swiftformat"]` | Possible paths for SwiftFormat config.                                                     |

## Contributors

- Valentin Knabel, [@vknabel](https://github.com/vknabel), dev@vknabel.com, [@vknabel](https://twitter.com/vknabel) on Twitter

## License

vscode-swiftformat is available under the [MIT](./LICENSE) license.
