#!/usr/bin/env pwsh
# Copyright 2018 the Seve authors. All rights reserved. MIT license.
# TODO(everyone): Keep this script simple and easily auditable.

$ErrorActionPreference = 'Stop'

if ($v) {
  $Version = "v${v}"
}
if ($args.Length -eq 1) {
  $Version = $args.Get(0)
}

$SeveInstall = $env:SEVE_INSTALL
$BinDir = if ($SeveInstall) {
  "$SeveInstall\bin"
}
else {
  "$Home\.seve\bin"
}

$SeveZip = "$BinDir\seve.zip"
$SeveExe = "$BinDir\seve.exe"
$Target = 'x86_64-pc-windows-msvc'

# GitHub requires TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$DenoUri = if (!$Version) {
  "https://github.com/youngjuning/seve/releases/latest/download/seve-${Target}.zip"
}
else {
  "https://github.com/youngjuning/seve/releases/download/${Version}/seve-${Target}.zip"
}

if (!(Test-Path $BinDir)) {
  New-Item $BinDir -ItemType Directory | Out-Null
}

Invoke-WebRequest $DenoUri -OutFile $SeveZip -UseBasicParsing

if (Get-Command Expand-Archive -ErrorAction SilentlyContinue) {
  Expand-Archive $SeveZip -Destination $BinDir -Force
}
else {
  if (Test-Path $SeveExe) {
    Remove-Item $SeveExe
  }
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  [IO.Compression.ZipFile]::ExtractToDirectory($SeveZip, $BinDir)
}

Remove-Item $SeveZip

$User = [EnvironmentVariableTarget]::User
$Path = [Environment]::GetEnvironmentVariable('Path', $User)
if (!(";$Path;".ToLower() -like "*;$BinDir;*".ToLower())) {
  [Environment]::SetEnvironmentVariable('Path', "$Path;$BinDir", $User)
  $Env:Path += ";$BinDir"
}

Write-Output "Seve was installed successfully to $SeveExe"
Write-Output "Run 'seve --help' to get started"