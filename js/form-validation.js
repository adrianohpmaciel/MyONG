/**
 * ============================================
 * FORM VALIDATION - MyONG Platform
 * Validação de formulários
 * ============================================
 */

(function() {
  'use strict';

  // ===== VALIDATION RULES =====
  const validationRules = {
    required: {
      validate: (value) => value.trim() !== '',
      message: 'Este campo é obrigatório'
    },
    email: {
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'E-mail inválido'
    },
    cpf: {
      validate: (value) => validateCPF(value),
      message: 'CPF inválido'
    },
    cnpj: {
      validate: (value) => validateCNPJ(value),
      message: 'CNPJ inválido'
    },
    phone: {
      validate: (value) => /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value),
      message: 'Telefone inválido. Use o formato: (11) 99999-9999'
    },
    cep: {
      validate: (value) => /^\d{5}-\d{3}$/.test(value),
      message: 'CEP inválido. Use o formato: 12345-678'
    },
    minLength: {
      validate: (value, minLength) => value.length >= minLength,
      message: (minLength) => `Mínimo de ${minLength} caracteres`
    },
    passwordMatch: {
      validate: (value, passwordId) => {
        const password = document.getElementById(passwordId);
        return password ? value === password.value : false;
      },
      message: 'As senhas não coincidem'
    },
    date: {
      validate: (value) => {
        const date = new Date(value);
        return date instanceof Date && !isNaN(date);
      },
      message: 'Data inválida'
    },
    minAge: {
      validate: (value, minAge) => {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          return age - 1 >= minAge;
        }
        return age >= minAge;
      },
      message: (minAge) => `Idade mínima: ${minAge} anos`
    }
  };

  // ===== CPF VALIDATION =====
  function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
  }

  // ===== CNPJ VALIDATION =====
  function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
      return false;
    }
    
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }
    
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
    
    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }
    
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;
    
    return true;
  }

  // ===== SHOW ERROR MESSAGE =====
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    input.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.setAttribute('role', 'alert');
    }
  }

  // ===== CLEAR ERROR MESSAGE =====
  function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    input.classList.remove('invalid');
    input.setAttribute('aria-invalid', 'false');
    
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.removeAttribute('role');
    }
  }

  // ===== VALIDATE FIELD =====
  function validateField(input) {
    clearError(input);
    
    const value = input.value;
    const type = input.type;
    const name = input.name;
    
    // Required validation
    if (input.hasAttribute('required')) {
      if (!validationRules.required.validate(value)) {
        showError(input, validationRules.required.message);
        return false;
      }
    }
    
    // Skip other validations if empty and not required
    if (!value.trim()) {
      return true;
    }
    
    // Email validation
    if (type === 'email') {
      if (!validationRules.email.validate(value)) {
        showError(input, validationRules.email.message);
        return false;
      }
    }
    
    // CPF validation
    if (input.id.includes('cpf')) {
      if (!validationRules.cpf.validate(value)) {
        showError(input, validationRules.cpf.message);
        return false;
      }
    }
    
    // CNPJ validation
    if (input.id.includes('cnpj')) {
      if (!validationRules.cnpj.validate(value)) {
        showError(input, validationRules.cnpj.message);
        return false;
      }
    }
    
    // Phone validation
    if (input.id.includes('phone')) {
      if (!validationRules.phone.validate(value)) {
        showError(input, validationRules.phone.message);
        return false;
      }
    }
    
    // CEP validation
    if (input.id.includes('cep')) {
      if (!validationRules.cep.validate(value)) {
        showError(input, validationRules.cep.message);
        return false;
      }
    }
    
    // Password validation
    if (type === 'password') {
      const minLength = parseInt(input.getAttribute('minlength')) || 8;
      if (!validationRules.minLength.validate(value, minLength)) {
        showError(input, validationRules.minLength.message(minLength));
        return false;
      }
    }
    
    // Confirm password validation
    if (input.id.includes('confirm-password')) {
      const passwordId = input.id.replace('confirm-', '');
      if (!validationRules.passwordMatch.validate(value, passwordId)) {
        showError(input, validationRules.passwordMatch.message);
        return false;
      }
    }
    
    // Date validation
    if (type === 'date') {
      if (!validationRules.date.validate(value)) {
        showError(input, validationRules.date.message);
        return false;
      }
      
      // Age validation for birth date
      if (input.id.includes('birth')) {
        if (!validationRules.minAge.validate(value, 16)) {
          showError(input, validationRules.minAge.message(16));
          return false;
        }
      }
    }
    
    // Select validation
    if (input.tagName === 'SELECT' && input.hasAttribute('required')) {
      if (!value) {
        showError(input, 'Selecione uma opção');
        return false;
      }
    }
    
    return true;
  }

  // ===== VALIDATE FORM =====
  function validateForm(form) {
    let isValid = true;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      if (input.type === 'checkbox' && input.hasAttribute('required')) {
        if (!input.checked) {
          showError(input, 'Este campo é obrigatório');
          isValid = false;
        } else {
          clearError(input);
        }
      } else if (input.type !== 'checkbox') {
        if (!validateField(input)) {
          isValid = false;
        }
      }
    });
    
    return isValid;
  }

  // ===== SETUP FORM VALIDATION =====
  function setupFormValidation(form) {
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Validate on blur
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      // Clear error on input
      input.addEventListener('input', function() {
        if (this.classList.contains('invalid')) {
          clearError(this);
        }
      });
      
      // Validate password match on confirm password input
      if (input.id.includes('confirm-password')) {
        const passwordId = input.id.replace('confirm-', '');
        const passwordInput = document.getElementById(passwordId);
        
        if (passwordInput) {
          passwordInput.addEventListener('input', function() {
            if (input.value) {
              validateField(input);
            }
          });
        }
      }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm(this)) {
        // Form is valid - show success message
        const formData = new FormData(this);
        console.log('Form submitted successfully!');
        console.log('Form data:', Object.fromEntries(formData));
        
        // Show success message
        alert('Cadastro realizado com sucesso! Em produção, os dados seriam enviados ao servidor.');
        
        // Reset form (optional)
        // this.reset();
      } else {
        // Focus first invalid field
        const firstInvalid = this.querySelector('.invalid');
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  // ===== INITIALIZE VALIDATION =====
  const forms = document.querySelectorAll('form[novalidate]');
  
  forms.forEach(form => {
    setupFormValidation(form);
  });

  // ===== CEP AUTOCOMPLETE (Integration with ViaCEP API) =====
  const cepInputs = document.querySelectorAll('input[id*="cep"]');
  
  cepInputs.forEach(input => {
    input.addEventListener('blur', function() {
      const cep = this.value.replace(/\D/g, '');
      
      if (cep.length === 8) {
        // Show loading state
        this.style.backgroundColor = '#f0f0f0';
        
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
            if (!data.erro) {
              // Fill address fields
              const form = this.closest('form');
              const stateSelect = form.querySelector('[id*="state"]');
              const cityInput = form.querySelector('[id*="city"]');
              const neighborhoodInput = form.querySelector('[id*="neighborhood"]');
              const streetInput = form.querySelector('[id*="street"]');
              
              if (stateSelect) stateSelect.value = data.uf;
              if (cityInput) cityInput.value = data.localidade;
              if (neighborhoodInput) neighborhoodInput.value = data.bairro;
              if (streetInput) streetInput.value = data.logradouro;
            }
          })
          .catch(error => {
            console.error('Erro ao buscar CEP:', error);
          })
          .finally(() => {
            this.style.backgroundColor = '';
          });
      }
    });
  });

})();
