function assignDayTypes() {
    const form = document.getElementById('orderForm');
    const dayTypeFields = [
        'vendorLeadTime', 'dcClubLeadTime', 'eventLeadTime', 
        'maxOrderDays', 'safetyStockDays', 'orderCycleDays'
    ];

    dayTypeFields.forEach(fieldId => {
        const field = form.querySelector(`#${fieldId}`);
        if (field) {
            field.value = 'Days';
        }
    });
}
