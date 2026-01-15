<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">
        🎓 Student MS
      </router-link>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/students" class="nav-link">Students</router-link>
        <router-link to="/students/add" class="nav-link btn-add">
          ➕ Add Student
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 25px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 8px;
}

.nav-link:hover {
  color: #667eea;
  background: #f8f9fa;
}

.nav-link.router-link-active:not(.btn-add) {
  color: #667eea;
  background: #f0f1ff;
}

.btn-add {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  padding: 10px 20px;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .nav-links {
    gap: 10px;
    font-size: 0.9rem;
  }
  
  .logo {
    font-size: 1.2rem;
  }
  
  .nav-link {
    padding: 6px 12px;
  }
}
</style>
