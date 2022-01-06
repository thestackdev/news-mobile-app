package com.shanmukeshwar.news;

import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  @Override
    protected void onCreate(Bundle savedInstanceState) {
    RNBootSplash.init(MainActivity.this);
    super.onCreate(null);
  }

  @Override
  protected String getMainComponentName() {
    return "news";
  }
}
