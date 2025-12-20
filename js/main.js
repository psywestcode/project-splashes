// js/main.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('Splashes: Main JS Loaded');

    // 1. jQuery Component: Initialize Bootstrap Modals/Tooltips if needed
    $('[data-toggle="tooltip"]').tooltip();

    // 2. Ajax Requirement: Load Locations via jQuery Ajax
    // Only runs if the #ajax-locations-container exists (e.g., on Locations page)
    if ($('#ajax-locations-container').length) {
        $.getJSON('data/locations.json', function(data) {
            console.log('Ajax loaded:', data);
            let html = '<div class="row">';
            $.each(data, function(key, val) {
                html += `
                    <div class="col-md-6 mb-4">
                        <div class="card h-100 shadow-sm border-0">
                            <div class="card-body">
                                <h4 class="card-title text-dark-navy">${val.region}</h4>
                                <p class="card-text text-primary font-weight-bold">${val.phone}</p>
                                <ul class="list-inline">
                                    ${val.cities.map(city => `<li class="list-inline-item badge badge-light p-2 mt-1">${city}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>`;
            });
            html += '</div>';
            $('#ajax-locations-container').html(html);
        }).fail(function() {
            $('#ajax-locations-container').html('<p class="text-danger">Error loading locations data.</p>');
        });
    }

    // 3. Vue.js Requirement: Simple Component
    // Only mounts if element exists
    if (document.getElementById('vue-app')) {
        new Vue({
            el: '#vue-app',
            data: {
                message: 'Find the perfect swim program for your child!',
                programs: ['Private Lessons', 'Semi-Private', 'Parent & Me', 'Stroke Clinic']
            }
        });
    }
});