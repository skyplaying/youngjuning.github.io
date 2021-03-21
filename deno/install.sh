#!/bin/sh
# Copyright 2019-2020 the Deno authors. All rights reserved. MIT license.
# TODO(everyone): Keep this script simple and easily auditable.

set -e

if [ "$(uname -m)" != "x86_64" ]; then
	echo "Error: Unsupported architecture $(uname -m). Only x64 binaries are available." 1>&2
	exit 1
fi

if ! command -v unzip >/dev/null; then
	echo "Error: unzip is required to install Deno (see: https://deno.js.cn/t/topic/167)." 1>&2
	exit 1
fi

case $(uname -s) in
Darwin) target="x86_64-apple-darwin" ;;
*) target="x86_64-unknown-linux-gnu" ;;
esac

if [ $# -eq 0 ]; then
	deno_version=$(curl -sSf https://dl.deno.land/release-latest.txt)
else
	deno_version="$1"
fi

deno_version=$(printf '%s' "$deno_version" | tr -d 'v')

if printf "%s\n" "$deno_version" | grep -q '1.[0-7].[0-9]'; then
	deno_uri="https://younguning.coding.net/p/deno/d/deno_releases/git/raw/master/${deno_version}/deno-${target}.zip"
else
	deno_uri="https://dl.deno.land/release/v${deno_version}/deno-${target}.zip"
fi

deno_install="${DENO_INSTALL:-$HOME/.deno}"
bin_dir="$deno_install/bin"
exe="$bin_dir/deno"

if [ ! -d "$bin_dir" ]; then
	mkdir -p "$bin_dir"
fi

curl --fail --location --progress-bar --output "$exe.zip" "$deno_uri"
unzip -d "$bin_dir" -o "$exe.zip"
chmod +x "$exe"
rm "$exe.zip"

echo "Deno 已经成功安装"
echo "可执行文件位置为 $exe"

if command -v deno >/dev/null; then
	echo "运行 'deno --help' 查看 Deno 帮助信息"
else
	case $SHELL in
	/bin/zsh) shell_profile=".zshrc" ;;
	*) shell_profile=".bash_profile" ;;
	esac
	echo "您需要手动将 Deno 目录添加到 \$HOME/$shell_profile (或者其它类似目录)"
	echo "  export DENO_INSTALL=\"$deno_install\""
	echo "  export PATH=\"\$DENO_INSTALL/bin:\$PATH\""
	echo "运行 '$exe --help' 查看 Deno 帮助信息"
fi
