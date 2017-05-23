if [ ! -d "key" ]; then
  mkdir key
fi

ionic build android --prod --release

cp ./platforms/android/build/outputs/apk/android-release-unsigned.apk ./key

cd key

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks android-release-unsigned.apk zhuzhiqiang

zipalign -v 4 android-release-unsigned.apk 天气.apk