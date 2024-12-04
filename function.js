document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const files = document.getElementById('file-upload').files;
    if (files.length === 0) {
        alert('Please select video files.');
        return;
    }

    let totalDuration = 0;
    let videoCount = files.length;
    let resultsHTML = '';

    // Loop through the selected files
    Array.from(files).forEach((file, index) => {
        let video = document.createElement('video');
        video.src = URL.createObjectURL(file);

        video.onloadedmetadata = function() {
            let videoDuration = video.duration;  // Duration in seconds
            totalDuration += videoDuration;

            // Once all videos are processed, display the result
            if (index === videoCount - 1) {
                resultsHTML = calculateDurations(totalDuration);
                document.getElementById('results').innerHTML = resultsHTML;
                document.getElementById('result-section').style.display = 'block';
            }
        };
    });

    // Function to calculate total duration at different speeds
    function calculateDurations(totalDurationInSeconds) {
        let resultHTML = '';
        let speeds = [1, 1.25, 1.5, 2];

        speeds.forEach(speed => {
            let durationAtSpeed = totalDurationInSeconds / speed;
            resultHTML += `<p><strong>${speed}x Speed:</strong> ${formatTime(durationAtSpeed)}</p>`;
        });

        return resultHTML;
    }

    // Function to format time in hours, minutes, and seconds
    function formatTime(seconds) {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = Math.floor(seconds % 60);
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
});
