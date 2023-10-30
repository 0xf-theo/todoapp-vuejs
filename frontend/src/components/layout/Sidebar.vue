<template>
  <nav class="bg-gray-800 text-white h-screen w-64">
    <!-- Profile Image -->
    <div class="bg-purple-700 p-4 text-center">
      <img
        :src="user.picutre ?? 'https://via.placeholder.com/150'"
        alt="Profile Image"
        class="w-16 h-16 mx-auto rounded-full"
      />
      <p class="mt-2 text-lg font-semibold">{{ user.username }}</p>
    </div>

    <!-- Sidebar Menu -->
    <ul class="py-4">
      <li class="mb-4">
        <router-link to="/task/add" class="block px-4 py-2"
          >Add Task</router-link
        >
      </li>
      <li class="mb-4">
        <router-link to="/task" class="block px-4 py-2">Your Tasks</router-link>
      </li>
      <li class="mb-4">
        <a @click.prevent="logout" class="block px-4 py-2">Logout</a>
      </li>

      <!-- <li>
        <router-link to="/dashboard/tasks/history" class="block px-4 py-2"
          >Tasks History</router-link
        >
      </li> -->
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    logout(response) {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
