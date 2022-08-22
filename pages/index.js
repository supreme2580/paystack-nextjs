import Script from "next/script";

export default function Home() {
  if (typeof window != "undefined") {
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener("submit", payWithPaystack, false);
    function payWithPaystack(e) {
      e.preventDefault();
      let handler = PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PUBLIC_KEY, // Replace with your public key
        email: document.getElementById("email-address").value,
        amount: document.getElementById("amount").value * 100,
        ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function(){
          alert('Window closed.');
        },
        callback: function(response){
          alert("The transaction status is => "+response.status)
        }
      });
      handler.openIframe();
  }
}
  return (
    <div>
      <Script src="https://js.paystack.co/v1/inline.js" />
      <div className="flex justify-center items-center w-full h-screen">
        <form id="paymentForm" className="p-5 shadow-lg space-y-8">
          <div className="space-x-4 flex justify-between items-center w-full">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email-address" placeholder="Email address" className="w-64 p-2.5 outline-none border-[0.5px] border-red-600" required />
          </div>
          <div className="space-x-4 flex justify-between items-center w-full">
            <label htmlFor="amount">Amount</label>
            <input type="tel" id="amount" placeholder="Amount to pay" className="w-64 p-2.5 outline-none border-[0.5px] border-red-600" required />
          </div>
          <div className="space-x-4 flex justify-between items-center w-full">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" placeholder="First Name" className="w-64 p-2.5 outline-none border-[0.5px] border-red-600" required />
          </div>
          <div className="space-x-4 flex justify-between items-center w-full">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" placeholder="Last Name" className="w-64 p-2.5 outline-none border-[0.5px] border-red-600" required />
          </div>
          <div >
            <button type="submit" className="p-2.5 bg-red-600 w-full text-white"> Pay </button>
          </div>
        </form>
      </div>
      
    </div>
  )
}