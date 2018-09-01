# SwiftFormat for VS Code

In order to prettify your Swift code, you need to have [SwiftFormat](https://github.com/nicklockwood/SwiftFormat) installed.

You can [install](https://github.com/nicklockwood/SwiftFormat#how-do-i-install-it) it using [Homebrew](http://brew.sh/) or [Mint](https://github.com/yonaskolb/Mint)

```bash
# Using Homebrew
$ brew update && brew install swiftformat
# Using Mint
$ mint install nicklockwood/SwiftFormat swiftformat
```

## Configuration

| Config                | Type       | Default                      | Description                                      |
| --------------------- | ---------- | ---------------------------- | ------------------------------------------------ |
| `swiftformat.enable`  | `Bool`     | `true`                       | Wether SwiftFormat should actually do something. |
| `swiftformat.path`    | `String`   | `/usr/local/bin/swiftformat` | The location of SwiftFormat.                     |
| `swiftformat.options` | `[String]` | `[]`                         | Additional parameters for SwiftFormat.           |

## Contributors

- Valentin Knabel, [@vknabel](https://github.com/vknabel), dev@vknabel.com, [@vknabel](https://twitter.com/vknabel) on Twitter

## License

Archery is available under the [MIT](./LICENSE) license.
