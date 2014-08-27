#!/bin/bash

# Use your own paths to Firefox binary (-b) and your Firefox
# profile for development (--profiledir)
# Read more: https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/cfx
cfx run \
  -o \
  --no-strip-xpi \
  -b C:/mozilla-dev/firefox/firefox-nightly/firefox.exe \
  --profiledir C:/Users/Honza/AppData/Roaming/Mozilla/Firefox/Profiles/ug2k4vci.nightlyNext002
