<template>
  <div class="bg-gray-100 py-16 min-h-screen flex-1">
    <div class="mx-auto max-w-[35rem] p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold mb-4">Add/Edit Task</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Task Title -->
        <div>
          <label for="title" class="block text-gray-700 font-medium mb-2"
            >Title:</label
          >
          <input
            type="text"
            id="title"
            v-model="task.title"
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <!-- Task Description -->
        <div>
          <label for="description" class="block text-gray-700 font-medium mb-2"
            >Description:</label
          >
          <textarea
            id="description"
            v-model="task.description"
            rows="4"
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400 focus:outline-none"
          ></textarea>
        </div>

        <!-- Due Date -->
        <div>
          <label for="dueDate" class="block text-gray-700 font-medium mb-2"
            >Due Date:</label
          >
          <input
            type="date"
            id="dueDate"
            v-model="task.dueDate"
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <!-- Priority -->
        <div>
          <label for="priority" class="block text-gray-700 font-medium mb-2"
            >Priority:</label
          >
          <select
            v-model="task.priority"
            class="w-full bg-white px-4 py-2 border rounded-md focus:ring focus:ring-purple-400 focus:outline-none"
          >
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low</option>
          </select>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full px-4 py-2 text-white bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      task: {
        title: "",
        description: "",
        dueDate: "",
        priority: "",
      },
      getLoader: false,
      saveLoader: false,
      inEditMode: false,
    };
  },

  created() {
    const id = this.$route.params.id;
    console.log("id", id);
    if (id) {
      this.inEditMode = true;
      this.fetchData();
    }
  },

  methods: {
    fetchData() {
      this.getLoader = true;

      axios
        .get(`http://localhost:8081/api/task/${this.$route.params.id}`)
        .then((response) => {
          const resData = response.data;

          if (resData.status) {

            this.task.title = resData.data.title;
            this.task.description = resData.data.description;
            this.task.dueDate =  new Date(resData.data.dueDate).toISOString().split('T')[0];
            this.task.priority = resData.data.priority;
          } else {
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
        });

      this.getLoader = false;
    },

    submitForm() {
      this.saveLoader = false;

      if (this.inEditMode) {
        // Edit mode: Make a PUT request to update the task
        axios
          .put(`http://localhost:8081/api/task/${this.$route.params.id}`, this.task)
          .then((response) => {
            const resData = response.data;
            if (resData.status) {
              this.$router.push("/task");
            } else {
              // Handle errors
            }
          })
          .catch((error) => {
            console.error("API Error:", error);
          })
          .finally(() => {
            this.saveLoader = false;
          });
      } else {
        // Add mode: Make a POST request to create a new task
        axios
          .post("http://localhost:8081/api/task", this.task)
          .then((response) => {
            const resData = response.data;
            if (resData.status) {
              this.$router.push("/task");
            } else {
              // Handle errors
            }
          })
          .catch((error) => {
            console.error("API Error:", error);
          })
          .finally(() => {
            this.saveLoader = false;
          });
      }
    }
  },
};
</script>
