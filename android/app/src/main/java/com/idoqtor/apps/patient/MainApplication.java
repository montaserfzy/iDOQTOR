package com.idoqtor.apps.patient;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactNativeQuickActions.AppShortcutsPackage;
import cl.json.RNSharePackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.actionsheet.ActionSheetPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;

import com.facebook.reactnative.androidsdk.FBSDKPackage;

import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.kevinresol.react_native_default_preference.RNDefaultPreferencePackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
 private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }



  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new NetInfoPackage(),
            new VectorIconsPackage(),
            new AppShortcutsPackage(),
            new RNSharePackage(),
            new RNFirebasePackage(),
            new RNDeviceInfo(),
            new ActionSheetPackage(),
            new ReactNativeRestartPackage(),
            new FBSDKPackage(mCallbackManager),
            new ReactNativeLocalizationPackage(),
            new RNDefaultPreferencePackage(),
            new MapsPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage(),
            new RNFirebaseMessagingPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
