{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
  ];

  shellHook = ''
    echo "Node.js $(node -v) development environment ready."
  '';
}
