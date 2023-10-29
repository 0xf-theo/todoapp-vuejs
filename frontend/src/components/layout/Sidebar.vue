<template>
  <nav class="bg-gray-800 text-white h-screen w-64">
    <!-- Profile Image -->
    <div class="bg-purple-700 p-4 text-center">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile Image"
        class="w-16 h-16 mx-auto rounded-full"
      />
      <p class="mt-2 text-lg font-semibold">John Doe</p>
    </div>

    <!-- Sidebar Menu -->
    <ul class="py-4">
      <li class="mb-4">
        <router-link to="/task/add" class="block px-4 py-2"
          >Add Task</router-link
        >
      </li>
      <li class="mb-4">
        <router-link to="/task" class="block px-4 py-2">Tasks</router-link>
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
};
</script>
