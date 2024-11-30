const params = new URLSearchParams(location.search);
$('#year').val(params.get('year') || 'Select Year');
$('#event').val(params.get('event') || 'Select Event');
if (params.has('event') && params.has('year')) {
    const comp = event.find(([code]) => code === params.get('event'));
    console.assert(comp !== undefined);
    $('<h2>')
        .text(`${params.get('year')} ${params.get('event')}`)
        .appendTo('#content');
    if (!['CO', 'CP', 'FW', 'PR', 'PO'].includes(params.get('event'))) {
        tres.find(
            ([code]) => code === `${params.get('year')} ${params.get('event')}`,
        )[1]
            .split('|')
            .map((result) => result.trim())
            .forEach((result) => {
                $('<div>')
                    .addClass('box')
                    .addClass(
                        result.includes('1st')
                            ? 'gold'
                            : result.includes('2nd')
                              ? 'silver'
                              : result.includes('3rd')
                                ? 'bronze'
                                : undefined,
                    )
                    .text(result)
                    .appendTo('#toggle');
            });
    }
    $('<br>').appendTo('#toggle');
    $('<h4>').text('Team Members:').appendTo('#toggle');
    $('<ul>')
        .append(
            res
                .find(([eventName]) => eventName === `${params.get('year')} ${params.get('event')}`)[1]
                .split('|')
                .map((result) => result.trim())
                .map((result) =>
                    $('<li>').append(
                        $('<a>')
                            .attr(
                                'href',
                                `profiles/${result.split(':')[0].trim().split(' ').join('-')}.html`,
                            )
                        .text(result.split(':')[0].trim()),
                        $('<span>').text(`: ${result.split(':')[1].trim()}`),
                    ),
                ),
        )
        .appendTo('#toggle');
}
