#!/bin/bash
# This script is used to build and install your kit. By default, it just moves the exported index.cjs file to the kit directory, however you may want to have it move some extra files as well.
cd "$(dirname "$0")"
INSTALL_DIR=$1

# remove any files that aren't needed
rm -rf .git


# ensure that the install directory exists
mkdir -p $INSTALL_DIR

# copy to the install directory
cp -r . $INSTALL_DIR

