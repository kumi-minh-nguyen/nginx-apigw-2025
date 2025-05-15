function csv_to_json(r) {
    var raw = r.requestText.trim();
    var parts = raw.split('|');

    if (parts.length !== 6 || parts[0] !== 'PAT') {
        r.return(400, JSON.stringify({
            error: "Invalid or unsupported CSV format",
            received: raw
        }));
        return;
    }

    var result = {
        record_type: parts[0],
        patient_id: parts[1],
        name: parts[2],
        dob: parts[3],
        gender: parts[4],
        blood_type: parts[5]
    };

    r.headersOut['Content-Type'] = 'application/json';
    r.return(200, JSON.stringify(result));
}

export default { csv_to_json };
