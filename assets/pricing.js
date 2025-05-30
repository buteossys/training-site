document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('pricing-tables-container');
    if (!container) return;

    container.innerHTML = ''; // Clear loading message

    function createTable(tableData, isServiceTable = false) {
        const tableWrapper = document.createElement('div');
        const tableTitle = document.createElement('h3');
        tableTitle.textContent = tableData.title;
        tableWrapper.appendChild(tableTitle);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const headerRow = document.createElement('tr');

        tableData.headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const items = isServiceTable ? tableData.services : (tableData.upgrades || tableData.models);

        items.forEach(item => {
            const tr = document.createElement('tr');
            if (isServiceTable) {
                ['name', 'price', 'features', 'assumptions'].forEach(key => {
                    const td = document.createElement('td');
                    td.textContent = item[key] || '';
                    tr.appendChild(td);
                });
            } else if (tableData.upgrades) { // Upgrade tables
                 ['category', 'tier', 'features', 'model', 'price', 'notes'].forEach(key => {
                    const td = document.createElement('td');
                    td.textContent = item[key] || '';
                    tr.appendChild(td);
                });
            } else { // Custom pricing models
                 ['name', 'description', 'pros', 'cons', 'use_case'].forEach(key => {
                    const td = document.createElement('td');
                    td.textContent = item[key] || '';
                    tr.appendChild(td);
                });
            }
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        tableWrapper.appendChild(table);
        return tableWrapper;
    }

    if (pricingCatalog.coreServices) {
        container.appendChild(createTable(pricingCatalog.coreServices, true));
    }
    if (pricingCatalog.websiteUpgrades) {
        container.appendChild(createTable(pricingCatalog.websiteUpgrades));
    }
    if (pricingCatalog.mobileAppUpgrades) {
        container.appendChild(createTable(pricingCatalog.mobileAppUpgrades));
    }
    if (pricingCatalog.aiPhoneAgentUpgrades) {
        container.appendChild(createTable(pricingCatalog.aiPhoneAgentUpgrades));
    }
    if (pricingCatalog.customPricingConsiderations) {
        container.appendChild(createTable(pricingCatalog.customPricingConsiderations));
    }
});