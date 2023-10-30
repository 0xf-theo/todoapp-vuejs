<template>
  <div class="p-5 h-screen bg-gray-100 min-h-screen flex-1">
    <h1 class="text-xl mb-2">Your Tasks</h1>

    <!-- Task Filtering -->
    <div>
      <label>Status:</label>
      <select v-model="selectedStatus">
        <!--style="{{ margin-right: 20px; margin-bottom: 10px;}}"-->
        <option value="">All</option>
        <option value="to do">To Do</option>
        <option value="progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

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
              Due Date
            </th>
            <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">
              Priority
            </th>
            <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">
              Share Task
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
              {{ task.dueDate }}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              {{ task.priority }}
            </td>
            <td class="p-3 text-sm whitespace-nowrap">
              <select
                v-model="task.status"
                v-if="
                  task.status === 'todo' ||
                  task.status === 'in-progress' ||
                  task.status === 'completed' ||
                  task.status === 'pending'
                "
                @change="changeStatus(task)"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
              <!-- Uncomment the lines below to add colors to the selected status -->
              <!-- <span
                :class="getStatusClass(task.status)"
                v-else
              >
                {{ task.status }}
              </span> -->
            </td>

            <td class="p-3 text-sm whitespace-nowrap">
              <button @click="shareTask(task)">Share</button>
            </td>
            <td class="p-3 text-sm whitespace-nowrap">
              <a
                @click="editTask(task._id)"
                class="text-blue-500 cursor-pointer"
              >
                Edit
              </a>
              <span class="mx-2">|</span>
              <a @click="deleteTask(task._id)" class="text-red-500 cursor-pointer">
                Delete
              </a>
            </td>
          </tr>

          <template>
            <!-- Your main content -->

            <!-- Modal backdrop -->
            <div
              v-if="showModal"
              class="fixed inset-0 flex items-center justify-center z-50"
            >
              <div
                class="modal-overlay fixed inset-0 bg-black opacity-50"
              ></div>

              <!-- Modal container -->
              <div
                class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
              >
                <!-- Modal content -->
                <div class="modal-content py-4 text-left px-6">
                  <h2 class="text-lg font-semibold mb-4">Modal Title</h2>
                  <p>Modal content goes here.</p>

                  <!-- Close button -->
                  <button @click="closeModal" class="modal-close-button">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- Share Task Modal -->
          <div
            v-if="showShareModal"
            class="fixed inset-0 flex items-center justify-center z-50"
          >
            <div class="modal-overlay fixed inset-0 bg-black opacity-50"></div>

            <!-- Modal container -->
            <div
              class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
            >
              <!-- Modal content -->
              <div class="modal-content py-4 text-left px-6">
                <h2 class="text-xl font-semibold mb-4">Share Task</h2>
                <p class="text-gray-600 mb-4">
                  Search for the users you want to share the task with:
                </p>

                <!-- Multi-select input for sharing with multiple users -->
                <!-- <multiselect
                  v-model="selectedUsers"
                  :options="userOptions"
                  label="name"
                  Replace
                  with
                  your
                  user
                  object
                  property
                  containing
                  names
                  track-by="id"
                  :multiple="true"
                  :custom-label="customLabel"
                  placeholder="Select users"
                  @search-change="searchUsers"
                ></multiselect> -->

                <input
                  v-model="sharedWithEmail"
                  type="text"
                  class="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter email or username"
                />

                <!-- Action buttons -->
                <div class="mt-4 flex justify-end">
                  <button
                    @click="shareTaskWithUsers"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                  >
                    Share
                  </button>
                  <button
                    @click="closeShareModal"
                    class="ml-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </tbody>
      </table>
      <!-- Sharing Modal -->
    </div>
  </div>
</template>

<script>
// import Multiselect from "vue-multiselect";
import axios from "axios";

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
        .get(`http://localhost:8081/api/task`)
        .then((response) => {
          const resData = response.data;

          if (response.status) {
            this.tasks = resData.data;
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

    shareTaskWithUser() {
      this.showShareModal = false;
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
        .delete(`http://localhost:8081/api/task/${id}`)
        .then((response) => {
          this.fetchData()
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    },

    changeStatus(task) {
      console.log("Change status of task:", task);
      axios
       .put(`http://localhost:8081/api/task/${task._id}`, {
        status: task.status,
        title: task.title,
        description: task.description,
        priority: task.priority,
        subtasks: task.subtasks,
        dueDate: task.dueDate
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
