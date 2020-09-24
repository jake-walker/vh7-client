<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense :value="true">
        <v-list-item-group color="primary">
          <v-list-item to="/">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/links">
            <v-list-item-action>
              <v-icon>mdi-link-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>My Links</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item to="/shorten">
            <v-list-item-action>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Shorten</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/paste">
            <v-list-item-action>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Paste</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/upload">
            <v-list-item-action>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Upload</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item to="/settings">
            <v-list-item-action>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-action>
              <v-icon>mdi-information</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.name || "VH7" }}</v-toolbar-title>
    </v-app-bar>


    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: null,
  })
};
</script>
