<template>
  <div class="student-details">
    <div v-if="!student" class="not-found">
      <h2>Student not found</h2>
      <router-link to="/students" class="btn">← Back to Students</router-link>
    </div>

    <div v-else class="details-container">
      <div class="details-header">
        <router-link to="/students" class="back-btn">← Back</router-link>
        <div class="header-actions">
          <router-link :to="`/students/${student.id}/edit`" class="btn btn-edit">
            ✏️ Edit
          </router-link>
          <button @click="confirmDelete" class="btn btn-delete">
            🗑️ Delete
          </button>
        </div>
      </div>

      <div class="profile-card">
        <div class="profile-avatar" v-if="student.image">
          <img :src="`/std-images/${student.image}`" :alt="student.name" />
        </div>
        <div class="profile-avatar" v-else>
          {{ student.name.charAt(0).toUpperCase() }}
        </div>
        <h1>{{ student.name }}</h1>
        <p class="student-id">Student ID: #{{ student.id }}</p>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">📧</div>
          <div class="info-content">
            <label>Email</label>
            <p>{{ student.email }}</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">🎂</div>
          <div class="info-content">
            <label>Age</label>
            <p>{{ student.age }} years old</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">📚</div>
          <div class="info-content">
            <label>Course</label>
            <p>{{ student.course }}</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">📅</div>
          <div class="info-content">
            <label>Enrollment Date</label>
            <p>{{ formatDate(student.enrollment_date || student.enrollmentDate) }}</p>
          </div>
        </div>

        <div class="info-card highlight">
          <div class="info-icon">⭐</div>
          <div class="info-content">
            <label>GPA</label>
            <p class="gpa">{{ student.gpa }}</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">⏱️</div>
          <div class="info-content">
            <label>Duration</label>
            <p>{{ getStudyDuration(student.enrollment_date || student.enrollmentDate) }}</p>
          </div>
        </div>
      </div>

      <div class="performance-section">
        <h2>Performance Overview</h2>
        <div class="performance-bar">
          <div class="bar-fill" :style="{ width: (student.gpa / 4 * 100) + '%' }"></div>
        </div>
        <p class="performance-text">
          {{ getPerformanceText(student.gpa) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mutations } from '../store/students'

export default {
  name: 'StudentDetails',
  data() {
    return {
      student: null
    }
  },
  async created() {
    const id = parseInt(this.$route.params.id)
    try {
      // First try to get from store (if already loaded)
      this.student = mutations.getStudent(id)
      // If not in store, fetch from API
      if (!this.student) {
        this.student = await mutations.fetchStudent(id)
      }
    } catch (error) {
      console.error('Error loading student:', error)
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    },
    getStudyDuration(enrollmentDate) {
      // Handle both enrollment_date and enrollmentDate field names
      const dateStr = enrollmentDate || this.student?.enrollment_date
      const start = new Date(dateStr)
      const now = new Date()
      const months = (now.getFullYear() - start.getFullYear()) * 12 + 
                     (now.getMonth() - start.getMonth())
      const years = Math.floor(months / 12)
      const remainingMonths = months % 12
      
      if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
      }
      return `${months} month${months !== 1 ? 's' : ''}`
    },
    getPerformanceText(gpa) {
      if (gpa >= 3.7) return 'Excellent performance! 🌟'
      if (gpa >= 3.0) return 'Good performance! 👍'
      if (gpa >= 2.5) return 'Average performance'
      return 'Needs improvement'
    },
    async confirmDelete() {
      if (confirm(`Are you sure you want to delete ${this.student.name}?`)) {
        try {
          await mutations.deleteStudent(this.student.id)
          this.$router.push('/students')
        } catch (error) {
          alert('Error deleting student: ' + error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
.student-details {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.back-btn {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
}

.back-btn:hover {
  text-decoration: underline;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit {
  background: #667eea;
  color: white;
}

.btn-edit:hover {
  background: #764ba2;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover {
  background: #c82333;
}

.profile-card {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 20px;
  margin-bottom: 30px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.3);
  border: 4px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  margin: 0 auto 20px;
  overflow: hidden;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-card h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
}

.student-id {
  opacity: 0.9;
  font-size: 1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.info-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 15px;
  align-items: start;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.info-card.highlight {
  background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
}

.info-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
}

.info-content label {
  display: block;
  font-size: 0.85rem;
  color: #6c757d;
  margin-bottom: 5px;
  font-weight: 600;
  text-transform: uppercase;
}

.info-content p {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 500;
}

.info-content .gpa {
  font-size: 2rem;
  font-weight: bold;
}

.performance-section {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.performance-section h2 {
  margin: 0 0 20px 0;
  color: #2c3e50;
}

.performance-bar {
  height: 30px;
  background: #e9ecef;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 15px;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.5s ease;
}

.performance-text {
  text-align: center;
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 500;
  margin: 0;
}

@media (max-width: 768px) {
  .profile-card h1 {
    font-size: 2rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
