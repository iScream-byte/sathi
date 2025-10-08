############################
# Core Capacitor & Cordova #
############################
-keep class com.getcapacitor.** { *; }
-keep class org.apache.cordova.** { *; }
-keep class com.ionicframework.** { *; }

############################
# Capacitor Plugins
############################
-keep class com.getcapacitor.plugin.camera.** { *; }
-keep class com.getcapacitor.plugin.geolocation.** { *; }
-keep class com.getcapacitor.plugin.device.** { *; }
-keep class com.getcapacitor.plugin.network.** { *; }
-keep class com.getcapacitor.plugin.haptics.** { *; }
-keep class com.getcapacitor.plugin.keyboard.** { *; }
-keep class com.getcapacitor.plugin.statusbar.** { *; }
-keep class com.getcapacitor.plugin.browser.** { *; }

############################
# Cordova Plugins
############################
-keep class org.apache.cordova.file.** { *; }
-keep class com.scottyab.rootbeer.** { *; }   # for root detection

############################
# Cordova Plugin Wrappers
############################
-keep class de.appplant.cordova.plugin.** { *; }
-keep class com.ionicframework.cordova.** { *; }
-keep class com.getcapacitor.community.** { *; }

############################
# JSON / Serialization (if used)
############################
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

############################
# Prevent warnings
############################
-dontwarn org.apache.cordova.**
-dontwarn com.getcapacitor.**
