function calculate() {
    const voltage = parseFloat(document.getElementById('voltage').value);
    const current = parseFloat(document.getElementById('current').value);
    const powerFactor = parseFloat(document.getElementById('powerFactor').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const costPerUnit = parseFloat(document.getElementById('costPerUnit').value);

    if (!validateInputs(voltage, current, powerFactor, hours, costPerUnit)) {
        return;
    }

    const apparentPower = voltage * current;
    const activePower = voltage * current * powerFactor;
    const sinPhi = Math.sqrt(1 - Math.pow(powerFactor, 2));
    const reactivePower = voltage * current * sinPhi;
    const dailyEnergy = (activePower * hours) / 1000;
    const monthlyEnergy = dailyEnergy * 30;
    const monthlyCost = monthlyEnergy * costPerUnit;

    displayResults(
        apparentPower,
        activePower,
        reactivePower,
        dailyEnergy,
        monthlyEnergy,
        monthlyCost,
        powerFactor
    );
}

function displayResults(S, P, Q, daily, monthly, cost, pf) {
    document.getElementById('results').style.display = 'block';
    document.getElementById('apparentPower').textContent = S.toFixed(2);
    document.getElementById('activePower').textContent = P.toFixed(2);
    document.getElementById('reactivePower').textContent = Q.toFixed(2);
    document.getElementById('dailyEnergy').textContent = daily.toFixed(3);
    document.getElementById('monthlyEnergy').textContent = monthly.toFixed(2);
    document.getElementById('monthlyCost').textContent = cost.toFixed(2);

    showPowerFactorStatus(pf);

    document.getElementById('results').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function showPowerFactorStatus(pf) {
    const pfStatus = document.getElementById('pfStatus');
    
    if (pf >= 0.95) {
        pfStatus.style.background = 'rgba(46, 213, 115, 0.2)';
        pfStatus.style.border = '1px solid #2ed573';
        pfStatus.style.color = '#2ed573';
        pfStatus.innerHTML = `✅ Excellent Power Factor (${pf}) - System is highly efficient!`;
    } else if (pf >= 0.85) {
        pfStatus.style.background = 'rgba(255, 165, 0, 0.2)';
        pfStatus.style.border = '1px solid orange';
        pfStatus.style.color = 'orange';
        pfStatus.innerHTML = `⚠️ Good Power Factor (${pf}) - Consider power factor correction`;
    } else {
        pfStatus.style.background = 'rgba(233, 69, 96, 0.2)';
        pfStatus.style.border = '1px solid #e94560';
        pfStatus.style.color = '#e94560';
        pfStatus.innerHTML = `❌ Poor Power Factor (${pf}) - Power factor correction needed!`;
    }
}

function validateInputs(v, i, pf, h, cost) {
    if (isNaN(v) || v <= 0) {
        alert('Please enter a valid Voltage value!');
        return false;
    }
    if (isNaN(i) || i <= 0) {
        alert('Please enter a valid Current value!');
        return false;
    }
    if (isNaN(pf) || pf < 0 || pf > 1) {
        alert('Power Factor must be between 0 and 1!');
        return false;
    }
    if (isNaN(h) || h <= 0 || h > 24) {
        alert('Usage hours must be between 0 and 24!');
        return false;
    }
    if (isNaN(cost) || cost <= 0) {
        alert('Please enter a valid cost per unit!');
        return false;
    }
    return true;
}

function resetValues() {
    document.getElementById('voltage').value = '';
    document.getElementById('current').value = '';
    document.getElementById('powerFactor').value = '0.8';
    document.getElementById('hours').value = '';
    document.getElementById('costPerUnit').value = '';
    document.getElementById('results').style.display = 'none';
}