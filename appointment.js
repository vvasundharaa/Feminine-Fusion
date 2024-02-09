document.getElementById('symptomsForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting normally

    let symptoms = [];
    let symptomInputs = document.querySelectorAll('input[name="symptom"]:checked');
    symptomInputs.forEach(function(input) {
        symptoms.push(input.value);
    });

    let types = getPCOSType(symptoms);
    types = [...new Set(types)];  // Remove duplicates
    document.getElementById('output').innerHTML = '<strong>PCOS Type:</strong> ' + types.join(', ');

    // Calculate the percentage of each type
    let typeCounts = types.reduce(function(obj, type) {
        obj[type] = (obj[type] || 0) + 1;
        return obj;
    }, {});
    let totalTypes = types.length;

    // Generate infographic HTML
    let infographicHTML = '';
    for (let type in typeCounts) {
        let percentage = (typeCounts[type] / totalTypes) * 100;
        infographicHTML += `<div class="infographic-item">
                                <div class="infographic-label">${type}:</div>
                                <div class="infographic-percentage">${percentage.toFixed(2)}%</div>
                            </div>`;
    }

    // Display the infographic
    document.getElementById('infographic').innerHTML = infographicHTML;
});

function getPCOSType(symptoms) {
    let types = [];
    if (symptoms.includes("Irregular_periods")) {
        types.push("Type A");
        types.push("Type C");
        if (symptoms.includes("Skin_Problems")) {
            types.push("Type A");
            types.push("Type B");
            types.push("Type C");
        }
        if (symptoms.includes("Infertility")) {
            types.push("Type A");
            types.push("Type C");
        }
        if (symptoms.includes("Excessive_Hair_Growth")) {
            types.push("Type B");
        }
    }
    return types;
}
