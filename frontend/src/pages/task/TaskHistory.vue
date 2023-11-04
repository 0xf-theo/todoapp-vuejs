<template>
  <div class="p-5 h-screen bg-gray-100 min-h-screen flex-1">
    <h1 class="text-xl mb-2">Your Tasks History</h1>

    <!-- Task Filtering -->
    <div>
      <label>Sort by:</label>
      <select v-model="sortBy">
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>

    <!-- Task List -->
    <div class="overflow-auto rounded-lg shadow">
      <table class="w-full">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">
              No.
            </th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
              Task Title
            </th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              Completed Date
            </th>
            <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">
              Priority
            </th>
            <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            class="bg-white"
            v-for="(task, index) in filteredTasks"
            :key="index"
          >
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <a href="#" class="font-bold text-blue-500 hover:underline">{{
                index + 1
              }}</a>
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              {{ task.title }}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              {{ task.completedDate }}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              {{ task.priority }}
            </td>

            <td class="p-3 text-sm whitespace-nowrap">
              <a
                @click="deleteTask(task._id)"
                class="text-red-500 cursor-pointer"
              >
                Delete
              </a>
            </td>
          </tr>


        </tbody>
      </table>
      <!-- Sharing Modal -->
    </div>
  </div>
</template>

<script>
// import Multiselect from "vue-multiselect";
import axios from "../../api";

export default {
  components: {
    // Multiselect,
  },

  data() {
    return {
      tasks: [],
      selectedStatus: "", // Filter status
      sortBy: "priority", // Sort by priority by default
      showShareModal: false,
      sharedTask: null,
      sharedWithEmail: "",
      userOptions: [],
      selectedUsers: [],
      getLoader: false,
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  created() {
    this.fetchData();
  },

  computed: {
    filteredTasks() {
      let filtered = this.tasks;

      if (this.selectedStatus) {
        filtered = filtered.filter(
          (task) => task.status === this.selectedStatus
        );
      }

      if (this.sortBy === "priority") {
        return filtered.sort((a, b) => (a.priority > b.priority ? 1 : -1));
      } else if (this.sortBy === "dueDate") {
        return filtered.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
      }

      console.log("filtered", this.filteredTasks);

      return filtered;
    },
  },

  methods: {
    fetchData() {
      this.getLoader = true;

      axios
        .get(`/api/task`)
        .then((response) => {
          const resData = response.data;

          if (response.status) {
            this.tasks = resData.data.filter(f => f.status == "completed" && f.createdBy == user._id);
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
        });

      this.getLoader = false;
    },

    shareTask(task) {
      this.sharedTask = task;
      this.showShareModal = true;
    },

    shareTaskWithUsers() {
      this.showShareModal = false;

      axios
        .get(
          `/api/task/share/${this.sharedTask._id}?email=${this.sharedWithEmail}`
        )
        .then((response) => {
          alert("Shared !");
          this.fetchData();
        })
        .catch((error) => {
          console.error("API Error:", error);
        })
        .finally(() => {
          this.saveLoader = false;
        });
    },

    closeShareModal() {
      this.showShareModal = false;
    },

    editTask(id) {
      this.$router.push(`/task/edit/${id}`);

      console.log("Edit task:", id);
    },

    deleteTask(id) {
      console.log("Delete task:", id);

      axios
        .delete(`/api/task/${id}`)
        .then((response) => {
          this.fetchData();
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    },

    changeStatus(task) {
      console.log("Change status of task:", task);
      axios
        .put(`/api/task/${task._id}`, {
          status: task.status,
          title: task.title,
          description: task.description,
          priority: task.priority,
          subtasks: task.subtasks,
          dueDate: task.dueDate,
        })
        .then((response) => {})
        .catch((error) => {
          console.error("API Error:", error);
        })
        .finally(() => {
          this.saveLoader = false;
        });
    },

    searchUsers(searchQuery) {
      if (searchQuery) {
        // Make an API call to search for users
        axios
          .get(`/api/search-users?query=${searchQuery}`)
          .then((response) => {
            this.userOptions = response.data;
          })
          .catch((error) => {
            console.error("Error searching for users", error);
          });
      }
    },
  },
};
</script>

<style scoped>
/* You can add custom styles if needed */
.modal-overlay {
  transition: opacity 0.2s;
}
.modal-container {
  max-width: 32rem; /* Adjust as needed */
  margin-top: 10vh; /* Adjust to center the modal vertically */
}
.modal-content {
  /* Adjust padding, font-size, and colors as needed */
}
</style>
