#!/bin/sh
# Copyright 2021 the Seve authors. All rights reserved. MIT license.
# TODO(everyone): Keep this script simple and easily auditable.

set -e

if ! command -v unzip >/dev/null; then
	echo "Error: unzip is required to install Seve (see: https://github.com/youngjuning/seve#unzip-is-required)." 1>&2
	exit 1
fi

if [ "$OS" = "Windows_NT" ]; then
	target="x86_64-pc-windows-msvc"
else
	case $(uname -sm) in
	"Darwin x86_64") target="x86_64-apple-darwin" ;;
	"Darwin arm64") target="aarch64-apple-darwin" ;;
	*) target="x86_64-unknown-linux-gnu" ;;
	esac
fi

if [ $# -eq 0 ]; then
	seve_uri="https://github.com/youngjuning/seve/releases/latest/download/seve-${target}.zip"
else
	seve_uri="https://github.com/youngjuning/seve/releases/download/${1}/seve-${target}.zip"
fi

seve_install="${SEVE_INSTALL:-$HOME/.seve}"
bin_dir="$seve_install/bin"
exe="$bin_dir/seve"

if [ ! -d "$bin_dir" ]; then
	mkdir -p "$bin_dir"
fi

curl --fail --location --progress-bar --output "$exe.zip" "$seve_uri"
unzip -d "$bin_dir" -o "$exe.zip"
chmod +x "$exe"
rm "$exe.zip"

echo "Seve was installed successfully to $exe"
if command -v seve >/dev/null; then
	echo "Run 'seve' to get started"
else
	case $SHELL in
	/bin/zsh) shell_profile=".zshrc" ;;
	*) shell_profile=".bash_profile" ;;
	esac
	echo "# Seve" >> $HOME/$shell_profile
	echo "export SEVE_INSTALL=\"$seve_install\"" >> $HOME/$shell_profile
	echo "export PATH=\"\$SEVE_INSTALL/bin:\$PATH\"" >> $HOME/$shell_profile
	source $HOME/$shell_profile
	echo "Run 'seve' to get started"
fi
