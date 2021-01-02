let openPainelBtn = document.getElementById('openAddContactPainel');
let closePainelBtn = document.getElementById('cancelBtn');
let addContactBtn = document.getElementById('addBtn');
let contactNameInput = document.getElementById('contactNameInput');
let contactPhoneInput = document.getElementById('contactPhoneInput');
let contactAddressInput = document.getElementById('contactAddressInput')
let contactTable = document.querySelector('.contact-table');
;

// função para abrir painel e fechar painel do novo contacto
function enableDisableModal(option) {
    contactNameInput.value = ''
    contactPhoneInput.value = ''
    contactAddressInput.value = ''
    let backdrop = document.getElementById('backdrop');
    let newContactPainel = document.getElementById('wrapper-new-contact-painel');
  
    backdrop.className = `${option}-modal`
    newContactPainel.className = `${option}-modal`
  }

// função para adicionar contatos a lista
function addContact(id) {
    if (contactNameInput.value === '' || contactPhoneInput.value === '' || contactAddressInput.value === '') {
        alert('Certifique-se de preencher todos os campos')
        return;
    }
    
    
    let name = contactNameInput.value;
    let phone = contactPhoneInput.value;
    let address = contactAddressInput.value;
    const contact = `
    <div class="contact-item">
             <p>${name}</p>
             <p>${phone}</p>
             <p class="spawn-two">${address}</p>
             <button class="contact-btn" id="editBtn">Editar</button>
             <button class="contact-btn"  id="removeBtn">Remover</button>
    </div>  
                    `;
  
    const position = 'afterbegin'
    contactTable.insertAdjacentHTML(position, contact)
    enableDisableModal('disable')
    contactNameInput.value = '';
    contactPhoneInput.value = '';
    contactAddressInput.value = '';
    updateLocalStorage()
    
    
}
// função para atualizar localStorage
function updateLocalStorage() {
   if (contactNameInput.value !== '' || contactPhoneInput.value !== '' || contactAddressInput.value !== '') {
       return;
   }
   localStorage.setItem('contacts', contactTable.innerHTML)
   
}

function reloadLocalStorage() {
    const data = localStorage.getItem('contacts')
    if (data) {
        contactTable.insertAdjacentHTML('afterbegin', data)
    }
    
}
   // função para excluir e editar
function identifyBtn(event) {
    const targetBtn = event.target
    const nodeParent = targetBtn.parentNode.parentNode
   
    console.log(targetBtn.id)
    
    if (targetBtn.id === 'removeBtn') {
        
       nodeParent.removeChild(targetBtn.parentNode)
       updateLocalStorage()
    } else if (targetBtn.id === 'editBtn') {
        const itemName = targetBtn.parentNode.children[0].innerHTML
        const itemPhone = targetBtn.parentNode.children[1].innerHTML
        const itemAddress = targetBtn.parentNode.children[2].innerHTML
        enableDisableModal('enable')
        nodeParent.removeChild(targetBtn.parentNode)
        contactNameInput.value = itemName;
        contactPhoneInput.value = itemPhone;
        contactAddressInput.value = itemAddress;
}
}
    

    

// chamando funções
openPainelBtn.addEventListener('click', () => {
    enableDisableModal('enable')
})

closePainelBtn.addEventListener('click', () => {
    enableDisableModal('disable')
    return;
   
})
addContactBtn.addEventListener('click', () => {
    addContact();
   
   
})

window.addEventListener('load', () => {
    reloadLocalStorage()
})

window.addEventListener('click', identifyBtn)
   









