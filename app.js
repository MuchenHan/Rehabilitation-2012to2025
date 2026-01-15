document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    function renderReferences(containerId, refs) {
        const container = document.getElementById(containerId);
        container.innerHTML = refs.map((ref, i) => {
            const doiMatch = ref.match(/<(https:\/\/doi\.org\/[^>]+)>/);
            const text = ref.replace(/<https:\/\/doi\.org\/[^>]+>/, '').replace(/^\d+\.\s*/, '').trim();
            const doiHtml = doiMatch
                ? `<a href="${doiMatch[1]}" target="_blank" rel="noopener" class="ref-doi">DOI →</a>`
                : '';
            return `<div class="reference-card"><span class="ref-number">${i + 1}</span><span class="ref-text">${text}</span>${doiHtml}</div>`;
        }).join('');
    }

    renderReferences('intervention-list', interventionStudies);
    renderReferences('survey-list', surveyStudies);
    renderReferences('review-list', reviewStudies);
    renderReferences('measurement-list', measurementStudies);
});
