let balance = 0;
let userId = 123456789;      // سيتم جلبه من Web App
let username = "@example";   // سيتم جلبه من Web App

document.getElementById("userId").innerText = userId;
document.getElementById("username").innerText = username;

function openModal() {
    document.getElementById("depositModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("depositModal").style.display = "none";
    document.getElementById("amount").value = "";
    document.getElementById("transactionId").value = "";
    document.getElementById("preview").innerText = "0";
}

function updatePreview() {
    let amount = parseFloat(document.getElementById("amount").value) || 0;
    let currency = document.getElementById("currency").value;
    let displayAmount = (currency === "usd") ? amount * 11400 : amount;
    document.getElementById("preview").innerText = displayAmount.toLocaleString();
}

function confirmDeposit() {
    let amount = parseFloat(document.getElementById("amount").value);
    let currency = document.getElementById("currency").value;
    let transactionId = document.getElementById("transactionId").value;

    if (!amount || !transactionId) {
        alert("⚠️ الرجاء إدخال المبلغ ورقم العملية");
        return;
    }

    fetch(`https://api.telegram.org/bot7753774564:AAFfEcPNUe4z4RDkPTwoBuwev15UnU8Pd9Y/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            chat_id: -4832988080,
            text: `🆔 ID: ${userId}\n👤 Username: ${username}\n💵 المبلغ: ${amount} ${currency === "usd" ? "$" : "ل.س"}\n🔢 رقم العملية: ${transactionId}`
        })
    });

    alert("✅ تم إرسال الطلب لمجموعة الشحن");
    closeModal();
}
