<template>
  <div class="home">
    <div class="hero">
      <h1>🎓 Student Management System</h1>
      <p class="subtitle">Manage your students efficiently and effectively</p>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ totalStudents }}</div>
          <div class="stat-label">Total Students</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ averageGPA }}</div>
          <div class="stat-label">Average GPA</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ totalCourses }}</div>
          <div class="stat-label">Courses</div>
        </div>
      </div>

      <div class="cta-buttons">
        <router-link to="/students" class="btn btn-primary">
          View All Students
        </router-link>
        <router-link to="/students/add" class="btn btn-secondary">
          Add New Student
        </router-link>
      </div>
    </div>

    <div class="features">
      <h2>Features</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">👥</div>
          <h3>Student List</h3>
          <p>View and search all students in one place</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">➕</div>
          <h3>Add Students</h3>
          <p>Easily add new students to the system</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">✏️</div>
          <h3>Edit Details</h3>
          <p>Update student information anytime</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔍</div>
          <h3>View Details</h3>
          <p>See comprehensive student profiles</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store/students'

export default {
  name: 'Home',
  computed: {
    totalStudents() {
      return store.students.length
    },
    averageGPA() {
      if (store.students.length === 0) return '0.0'
      const sum = store.students.reduce((acc, student) => acc + student.gpa, 0)
      return (sum / store.students.length).toFixed(1)
    },
    totalCourses() {
      const uniqueCourses = new Set(store.students.map(s => s.course))
      return uniqueCourses.size
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  margin-bottom: 60px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  font-weight: bold;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto 40px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 15px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 15px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
  transform: translateY(-2px);
}

.features {
  padding: 20px;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #2c3e50;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  padding: 30px;
  text-align: center;
  border-radius: 15px;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.feature-card p {
  color: #6c757d;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
