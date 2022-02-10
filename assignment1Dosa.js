const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOME:   Symbol("Welcome"),
    ITEM1: Symbol("item1"),
    SIZE1:   Symbol("size1"),
    TOPPINGS1:   Symbol("toppings1"),
    ITEM2WELCOME: Symbol("item2welcome"),
    ITEM2: Symbol("item2"),
    SIZE2: Symbol("size2"),
    TOPPINGS2: Symbol("toppings2"),
    DRINKS:  Symbol("drinks"),
    BIRIYANI: Symbol("biriyani"),
    PAYMENT: Symbol("payment")
});

module.exports = class DosaOrder extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOME;
        this.item1 = ""; //menu has 2 items. will validate which is ordered based on user input
        this.size1 = "";
        this.toppings1 = "";
        this.item2 = "";
        this.size2 = "";
        this.toppings2 = "";
        this.drinks = "";
        this.biriyani = "";
        this.total = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        let intro = "Welcome to Jay Bhavani"
        let itemIntro = "What would you like to have? \n 1. Dosa \n 2. Dabeli";
        let product1Intro = "What size would you like?   \n Small Dosa (Enter s) - $4.00 \n Medium Dosa  (Enter m)) - $6.00 \n Large Dosa (Enter l) - $8.00"
        let product2Intro ="What size would you like? \n Small Dabeli (Enter s) - $3.00 \n Medium Dabeli (Enter m)) - $5.00 \n Large Dabeli (Enter l) - $7.00"
        let validItem = "Please enter a valid item";
        let toppingsMsg = "What toppings would you like to have?";
        let sizeMsg ="Please enter a valid size. Small (Enter s), medium (Enter m) or large (Enter l).";
        let addSomething = 'Would you like to add a something else ? \n 1. Yes (Enter y)\n 2. No (Enter n)';
        let secondItemMsg = 'What second item from the menu would you like? \n 1. Dosa \n 2. Dabeli';
        let biriyaniMsg = 'Would you like to have Biriyani?';
        let biriyaniProductMsg = 'Would you like Biriyani with that? \n 1. Veg - $2.00 \n 2.  Chicken - $2.00 \n 3. No (Enter n)';
        let drinkMsg = "Would you like a drink with that?";
        switch(this.stateCur){
            case OrderState.WELCOME:
                this.stateCur = OrderState.ITEM1;
                aReturn.push(intro); 
                aReturn.push(itemIntro); 
                break;
            case OrderState.ITEM1:
                if(sInput.toLowerCase() == "dosa"){ 
                    this.item1 = sInput; 
                    this.stateCur = OrderState.SIZE1;
                    aReturn.push(product1Intro);
                }
                else if(sInput.toLowerCase() == "dabeli"){
                    this.item1 = sInput;
                    this.stateCur = OrderState.SIZE1;
                    aReturn.push(product2Intro);
                }
                else{
                    aReturn.push(validItem) 
                    aReturn.push(itemIntro); 
                    this.stateCur = OrderState.ITEM1;
                    break;
                }
                break;
            case OrderState.SIZE1:
                if(sInput.toLowerCase() == "s"){ 
                    this.size1 = sInput; 
                    this.stateCur = OrderState.TOPPINGS1
                    aReturn.push(toppingsMsg);
                }
                else if(sInput.toLowerCase() == "m"){
                    this.size1 = sInput;
                    this.stateCur = OrderState.TOPPINGS1
                    aReturn.push(toppingsMsg);
                }
                else if(sInput.toLowerCase() == "l"){
                    this.size1 = sInput;
                    this.stateCur = OrderState.TOPPINGS1
                    aReturn.push(toppingsMsg);
                }
                else{
                    aReturn.push(sizeMsg)
                    this.stateCur = OrderState.SIZE1;
                    break;
                }
                break;
            case OrderState.TOPPINGS1:
                this.stateCur = OrderState.ITEM2WELCOME; 
                this.toppings1 = sInput;
                aReturn.push(addSomething); 
                break;
            case OrderState.ITEM2WELCOME:
                if(sInput.toLowerCase() == "y"){ 
                    this.stateCur = OrderState.ITEM2; 
                    aReturn.push(secondItemMsg);
                }
                if (sInput.toLowerCase() == "n"){
                    this.stateCur = OrderState.BIRIYANI; 
                    aReturn.push(biriyaniProductMsg); 
                }
                break;
            case OrderState.ITEM2:
                if (sInput.toLowerCase() == "dosa"){
                    this.item2 = sInput; 
                    this.stateCur = OrderState.SIZE2;
                    aReturn.push(product1Intro);
                }
                else if(sInput.toLowerCase() == "dabeli"){
                    this.item2 = sInput;
                    this.stateCur = OrderState.SIZE2;
                    aReturn.push(product2Intro);
                }
                else{
                    aReturn.push(validItem) 
                    aReturn.push(secondItemMsg); 
                    this.stateCur = OrderState.ITEM2;
                    break;
                }
                break;
            case OrderState.SIZE2:
                    if(sInput.toLowerCase() == "s"){ 
                        this.size2 = sInput; 
                        this.stateCur = OrderState.TOPPINGS2
                        aReturn.push(toppingsMsg);
                    }
                    else if(sInput.toLowerCase() == "m"){
                        this.size2 = sInput;
                        this.stateCur = OrderState.TOPPINGS2
                        aReturn.push(toppingsMsg);
                    }
                    else if(sInput.toLowerCase() == "l"){
                        this.size2 = sInput;
                        this.stateCur = OrderState.TOPPINGS2
                        aReturn.push(toppingsMsg);
                    }
                    else{
                        aReturn.push(sizeMsg)
                        this.stateCur = OrderState.SIZE2;
                        break;
                    }
                    break;
            case OrderState.TOPPINGS2:
                    this.stateCur = OrderState.BIRIYANI; 
                    this.toppings2 = sInput;
                    aReturn.push(biriyaniProductMsg); 
                    break;
            case OrderState.BIRIYANI:
                this.stateCur = OrderState.DRINKS;
                debugger;
                 this.biriyani = 'n';
                if(sInput.toLowerCase() == 'veg' || sInput.toLowerCase() == 'chicken' ){ 
                    this.biriyani = sInput;
                } 
                else if(sInput.toLowerCase() != 'n' && sInput.toLowerCase() != 'no'){
                    aReturn.push(validItem) 
                    aReturn.push(biriyaniProductMsg); 
                    this.stateCur = OrderState.BIRIYANI;
                    break;
                }
                aReturn.push(drinkMsg );
                break;
            case OrderState.DRINKS:
                this.stateCur = OrderState.PAYMENT;
               
                this.isDone(true);
                if(sInput.toLowerCase()== "y" || sInput.toLowerCase()=='yes'){
                    this.drinks = sInput;
                }

               
                let beforePrice = 0;
                let smallDosa = 4.00;
                let mediumDosa = 6.00;
                let largeDosa = 8.00;
                let smallDabeli = 3.00;
                let mediumDabeli = 5.00;
                let largeDabeli = 6.00;
                let biriyaniCost = 2.00;
                let sDrinksCost = 2.50;

                if(this.biriyani != 'n' && this.biriyani != 'no'){
                    beforePrice += biriyaniCost;
                }
                if(this.drinks){ 
                    beforePrice += sDrinksCost;
                }
               if(this.item1.toLowerCase() == "dosa"){ 
                    if(this.size1.toLowerCase() == "s"){ 
                        beforePrice += smallDosa;
                    }
                    if(this.size1.toLowerCase() == "m"){ 
                        beforePrice += mediumDosa;
                    }
                    if(this.size1.toLowerCase() == "l"){ 
                        beforePrice += largeDosa;
                    }        
                }
                if(this.item1.toLowerCase() == "dabeli"){ 
                    if(this.size1.toLowerCase() == "s"){ 
                        beforePrice += smallDabeli;
                    }
                    if(this.size1.toLowerCase() == "m"){ 
                        beforePrice += mediumDabeli;
                    }
                    if(this.size1.toLowerCase() == "l"){ 
                        beforePrice += largeDabeli;
                    }        
                }
                if(this.item2.toLowerCase() == "dosa"){ 
                    if(this.size2.toLowerCase() == "s"){ 
                        beforePrice += smallDosa;
                    }
                    if(this.size2.toLowerCase() == "m"){ 
                        beforePrice += mediumDosa;
                    }
                    if(this.size2.toLowerCase() == "l"){ 
                        beforePrice += largeDosa;
                    }        
                }
                if(this.item2.toLowerCase() == "dabeli"){ 
                    if(this.size2.toLowerCase() == "s"){ 
                        beforePrice += smallDabeli;
                    }
                    if(this.size2.toLowerCase() == "m"){ 
                        beforePrice += mediumDabeli;
                    }
                    if(this.size2.toLowerCase() == "l"){ 
                        beforePrice += largeDabeli;
                    }        
                }
                let tax = 0.13;
                this.total = tax * beforePrice + beforePrice; 
                this.nOrder =  this.total ;
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.size1 == 's' ? 'small' : this.size1 == 'm' ? 'medium' : 'large'} ${this.item1}  ${(this.toppings1 != 'n' && this.toppings1 != 'no') ? 'with ' + this.toppings1 : ''}`);
                if(this.item2){ 
                aReturn.push(`${this.size1 == 's' ? 'small' : this.size1 == 'm' ? 'medium' : 'large'} ${this.item2} ${(this.toppings2 != 'n' && this.toppings2 != 'no') ? 'with ' + this.toppings2 : ''}`);
                }
                console.log('this.biriyani');
                if(this.biriyani != 'n' && this.biriyani != 'no'){
                    aReturn.push(this.biriyani + 'Biriyani');
                }
                if(this.drinks){
                    aReturn.push(this.drinks);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pay for your order here`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                //aReturn.push(`Please pick it up at ${d.toDateString() + ' ' + d.toLocaleTimeString()}. Your order total is $${this.total.toFixed(2)}`); 
                break;
            
             case OrderState.PAYMENT:
                 debugger;
                    //console.log(sInput);
                    this.isDone(true);
                    let purDate = new Date();
                    purDate.setMinutes(purDate.getMinutes() + 20);
                  
                    let shippingdata = JSON.stringify(sInput.purchase_units[0].shipping);
                  let shipping = JSON.parse(shippingdata);
                  let address = shipping.address;
                    aReturn.push(`Your order will be delivered to ${address.address_line_1} ${address.admin_area_2} ${address.admin_area_1} ${address.postal_code} ${address.country_code} at  ${purDate.toTimeString()}`);
                    break;


            }
        return aReturn;
    }

    renderForm(sTitle = "-1", sAmount = "-1"){
        debugger;
        // your client id should be kept private
        if(sTitle != "-1"){
          this.sItem = sTitle;
        }
        if(sAmount != "-1"){
          this.nOrder = sAmount;
        }
        const sClientID = process.env.SB_CLIENT_ID || 'put your client id here for testing ... Make sure that you delete it before committing'
        return(`
        <!DOCTYPE html>
    
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
        </head>
        
        <body>
          <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
          <script
            src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
          </script>
          Thank you ${this.sNumber} for your ${this.item1}  ${this.item2 != '' ? ' & ' + this.item2 : ''}   order of $${this.nOrder}.
          <div id="paypal-button-container"></div>
    
          <script>
            paypal.Buttons({
                createOrder: function(data, actions) {
                  // This function sets up the details of the transaction, including the amount and line item details.
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: '${this.nOrder}'
                      }
                    }]
                  });
                },
                onApprove: function(data, actions) {
                  // This function captures the funds from the transaction.
                  return actions.order.capture().then(function(details) {
                    // This function shows a transaction success message to your buyer.
                    $.post(".", details, ()=>{
                      window.open("", "_self");
                      window.close(); 
                    });
                  });
                }
            
              }).render('#paypal-button-container');
            // This function displays Smart Payment Buttons on your web page.
          </script>
        
        </body>
            
        `);
    
      }
}