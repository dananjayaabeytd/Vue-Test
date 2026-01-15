<template>
  <div class="add-student">
    <div class="form-container">
      <div class="form-header">
        <router-link to="/students" class="back-btn">← Back</router-link>
        <h1>➕ Add New Student</h1>
      </div>

      <form @submit.prevent="handleSubmit" class="student-form">
        <div class="form-group">
          <label for="name">Full Name *</label>
          <input 
            id="name"
            v-model="form.name" 
            type="text" 
            required
            placeholder="Enter student's full name"
          />
        </div>

        <div class="form-group">
          <label for="email">Email Address *</label>
          <input 
            id="email"
            v-model="form.email" 
            type="email" 
            required
            placeholder="student@example.com"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="age">Age *</label>
            <input 
              id="age"
              v-model.number="form.age" 
              type="number" 
              required
              min="16"
              max="100"
              placeholder="18"
            />
          </div>

          <div class="form-group">
            <label for="gpa">GPA *</label>
            <input 
              id="gpa"
              v-model.number="form.gpa" 
              type="number" 
              required
              step="0.01"
              min="0"
              max="4"
              placeholder="3.5"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="course">Course *</label>
          <select id="course" v-model="form.course" required>
            <option value="">Select a course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Medicine">Medicine</option>
            <option value="Law">Law</option>
            <option value="Arts">Arts</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
          </select>
        </div>

        <div class="form-group">
          <label for="enrollmentDate">Enrollment Date *</label>
          <input 
            id="enrollmentDate"
            v-model="form.enrollmentDate" 
            type="date" 
            required
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            ✓ Add Student
          </button>
          <router-link to="/students" class="btn btn-secondary">
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mutations } from '../store/students'

export default {
  name: 'AddStudent',
  data() {
    return {
      form: {
        name: '',
        email: '',
        age: '',
        course: '',
        enrollmentDate: new Date().toISOString().split('T')[0],
        gpa: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      mutations.addStudent(this.form)
      this.$router.push('/students')
    }
  }
}
</script>

<style scoped>
.add-student {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

.form-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.form-header {
  margin-bottom: 30px;
}

.back-btn {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 15px;
}

.back-btn:hover {
  text-decoration: underline;
}

.form-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 2rem;
}

.student-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  color: #495057;
  font-weight: 600;
  font-size: 0.95rem;
}

.form-group input,
.form-group select {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group select {
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.btn {
  flex: 1;
  padding: 14px 30px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-align: center;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f8f9fa;
  color: #495057;
  border: 2px solid #e0e0e0;
}

.btn-secondary:hover {
  background: #e9ecef;
}

@media (max-width: 768px) {
  .form-container {
    padding: 25px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>
