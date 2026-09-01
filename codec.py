#!/usr/bin/env python3
import sys

src, dst, rawshift = sys.argv[1:4]
shift = int(rawshift)

with open(src, "rb") as f:
    data = f.read()

with open(dst, "wb") as f:
    f.write(bytes((b + shift) % 256 for b in data))