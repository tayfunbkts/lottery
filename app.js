 const asilKazananCountInput = document.getElementById("asilKazananCountInput");
    const yedekKazananCountInput = document.getElementById("yedekKazananCountInput");
    const winners = document.getElementById("winners");
    const bWinners = document.getElementById("bWinners");
    const displayList = document.getElementById("displayList");
    const loadingMessage = document.getElementById("loadingMessage");
    const giris = document.getElementById("giris");
    const resetButton = document.getElementById('reset');

    let valuesArray = [];
    let asilKazananCount = 0;
    let yedekKazananCount = 0;
    let isimlerEklendi = false;
    let cekilisBasladi = false;
    let yedekSecimi = 0;
    let son = 0;

    function addName() {
      const inputValues = document.getElementById("inputValues").value;
      if (inputValues) {
        if (!isimlerEklendi) {
          const tempArray = inputValues.toLocaleUpperCase("tr").split(",");
          valuesArray = tempArray.map(item => item.trim());
          displayNames();
          isimlerEklendi = true

        } else {

          let ask = confirm(`     İsimler Zaten Eklendi. 
    Yeniden Başlamak İster  misiniz?`)

          if (ask) {
            isimlerEklendi = false;
            valuesArray = []
            displayNames();
            displayList.innerHTML = ''
            addName()
          }

        }
      }

    }

    function displayNames() {
      // valuesArray.sort()
      valuesArray.sort((a, b) => a.localeCompare(b, 'tr'));
      valuesArray.forEach((value) => {
        const listItem = document.createElement("li");
        listItem.textContent = value.trim();
        listItem.addEventListener("click", () => removeItem(listItem));
        displayList.appendChild(listItem);
        document.getElementById('participants').innerText = ` - ${valuesArray.length}`
      });
    }

    function removeItem(item) {
      const removedValue = item.textContent.trim();
      item.parentNode.removeChild(item);
      valuesArray = valuesArray.filter((value) => value.trim() !== removedValue);
      document.getElementById('participants').innerText = ` - ${valuesArray.length}`
    }

    function selectWinners() {
      if (!cekilisBasladi) {

        asilKazananCount = parseInt(asilKazananCountInput.value);
        yedekKazananCount = parseInt(yedekKazananCountInput.value);


        if (!valuesArray.length) {
          alert(`Lütfen önce katılımcıları ekleyiniz`)

        } else if ((asilKazananCount + yedekKazananCount) > valuesArray.length) {
          alert(`Katılımcı sayısı : ${valuesArray.length} \n Kazanan ve yedek kazanan toplamı katılımcı sayısına eşit veya daha düşük olmalıdır`)
        } else if (asilKazananCountInput.value <= 0) {

          alert(`Kazanan sayısı 0'dan büyük olmalıdır`)

        } else {
          startDraw()
        }
      }

    }

    function startDraw() {
      if (isimlerEklendi) {
        cekilisBasladi = true
        giris.style.display = "none";

        let index = 0;

        for (let i = 0; i < asilKazananCount; i++) {
          select()
        }

        function select() {
          
          const intervalID = setInterval(() => {
            if (index < valuesArray.length) {
              loadingMessage.innerText = valuesArray[index];
              index += 2;
            } else {
              clearInterval(intervalID); 
              const randomIndex = Math.floor(Math.random() * valuesArray.length);
              const randomName = valuesArray[randomIndex];
              loadingMessage.innerText = valuesArray[randomIndex];
              let li = document.createElement("li");
              li.textContent = randomName
              winners.appendChild(li);
              valuesArray.splice(randomIndex, 1);
              displayList.innerHTML = ''
              displayNames()
              index = 0;
              yedekSecimi++
            }
          }, 333);

        }
      }
      finishChecks()
    }


    function backups() {
      for (let i = 0; i < yedekKazananCount; i++) {
        select()
      }
      let index = 0;

      function select() {
        const intervalID = setInterval(() => {
          if (index < valuesArray.length) {
            loadingMessage.innerText = valuesArray[index];
            index +=2;
          } else {
            clearInterval(intervalID);
            const randomIndex = Math.floor(Math.random() * valuesArray.length);
            const randomName = valuesArray[randomIndex];
            loadingMessage.innerText = valuesArray[randomIndex];
            let li = document.createElement("li");
            li.textContent = randomName
            bWinners.appendChild(li);
            valuesArray.splice(randomIndex, 1);
            displayList.innerHTML = ''
            index = 0;
            displayNames()
            son++

          }
        }, 333);

      }
    }

    function finishChecks() {

      const intervalID2 = setInterval(() => {
        if (yedekSecimi === asilKazananCount) {
          backups()
          clearInterval(intervalID2);
          konfetiYagdir()
        }
      }, 1000);

      const intervalID3 = setInterval(() => {
        if (son === yedekKazananCount) {
          document.getElementById('participants').innerText = ` - ${valuesArray.length}`
          clearInterval(intervalID3);
          
        }
      }, 1000);

    }

    resetButton.addEventListener('click',()=>{
      console.log('butona basıldı')

      let resetle = confirm('Tüm süreç sıfırlanacaktır. Devam edilsin mi?') 
      
      if (resetle) {
        window.location.reload()
      }

    })
    
    function konfetiYagdir() {
      const emojis = ['🎉', '🎊', '🥳','🎈']; 
      const konfetiSayisi = 200;  
      for (let i = 0; i < konfetiSayisi; i++) {
        let konfeti = document.createElement('div');
        konfeti.className = 'konfeti';
        konfeti.textContent = emojis[Math.floor(Math.random() * emojis.length)]; 
        konfeti.style.left = Math.random() * window.innerWidth + 'px';
        // konfeti.style.top = (Math.random() * window.innerHeight + window.scrollY) + 'px';
        konfeti.style.animationDelay = Math.random() + 's'; 
        document.body.appendChild(konfeti);
        
        setTimeout(() => {
          konfeti.remove();  
        }, 2000);  
      }
    }
    
    //Coded by Tayfun Bektaş - 2023
