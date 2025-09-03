'use strict';

(async function() {
    let cardColor, labelColor, borderColor, bodyColor;

    cardColor = config.colors.cardColor;
    labelColor = config.colors.textMuted;
    borderColor = config.colors.borderColor;
    bodyColor = config.colors.bodyColor;

    const jsonUrl = '../../json/database/hit';

    try {
        const response = await fetch(jsonUrl);
        const data = await response.json();
        const hitTerbanyak = Math.max(...Object.values(data.weekly));
        const persent = percentage(data.total_hits, data.successful_requests);

        const weeklyOverviewChartEl = document.querySelector('#weeklyOverviewChart');
        const weeklyOverviewChartConfig = {
            chart: {
                type: 'bar',
                height: 200,
                offsetY: -9,
                offsetX: -16,
                parentHeightOffset: 0,
                toolbar: {
                    show: false
                }
            },
            series: [{
                name: 'Request',
                data: [data.weekly.Senin, data.weekly.Selasa, data.weekly.Rabu, data.weekly.Kamis, data.weekly.Jumat, data.weekly.Sabtu, data.weekly.Minggu]
            }],
            colors: [config.colors.primary],
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    columnWidth: '30%',
                    endingShape: 'rounded',
                    startingShape: 'rounded'
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            grid: {
                strokeDashArray: 8,
                borderColor,
                padding: {
                    bottom: -10
                }
            },
            xaxis: {
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    opacity: 0
                },
                axisBorder: {
                    show: false
                },
                categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                tickPlacement: 'on',
                labels: {
                    show: false
                }
            },
            yaxis: {
                min: 0,
                max: hitTerbanyak + 10,
                show: true,
                tickAmount: 3,
                labels: {
                    formatter: function(val) {
                        return parseInt(val);
                    },
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Inter',
                        colors: labelColor
                    }
                }
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            responsive: [{
                breakpoint: 1500,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '40%'
                        }
                    }
                }
            }, {
                breakpoint: 1200,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '30%'
                        }
                    }
                }
            }, {
                breakpoint: 815,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 5
                        }
                    }
                }
            }, {
                breakpoint: 768,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            columnWidth: '20%'
                        }
                    }
                }
            }, {
                breakpoint: 568,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 8,
                            columnWidth: '30%'
                        }
                    }
                }
            }, {
                breakpoint: 410,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '50%'
                        }
                    }
                }
            }]
        };

        if (weeklyOverviewChartEl) {
            const weeklyOverviewChart = new ApexCharts(weeklyOverviewChartEl, weeklyOverviewChartConfig);
            weeklyOverviewChart.render();
        }

        const persentSuccessChartEl = document.querySelector('#persentSuccess');

        if (persentSuccessChartEl) {
            const persentSuccessChartConfig = {
                series: [persent],
                chart: {
                    height: 350,
                    type: "radialBar",
                    offsetY: -30,
                    sparkline: {
                        enabled: true
                    }
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: "55%"
                        },
                        startAngle: -90,
                        endAngle: 90,
                        dataLabels: {
                            name: {
                                show: false
                            },
                            value: {
                                offsetY: -8,
                                fontSize: "24px",
                                fontWeight: 500,
                                fontFamily: "Inter",
                                color: "var(--bs-body-color)",
                                formatter: function(e) {
                                    return persent + "%"
                                }
                            }
                        },
                        track: {
                            background: cardColor
                        }
                    }
                },
                states: {
                    hover: {
                        filter: {
                            type: "none"
                        }
                    },
                    active: {
                        filter: {
                            type: "none"
                        }
                    }
                },
                stroke: {
                    dashArray: 6
                },
                colors: [config.colors.primary],
                labels: ["New Sales"],
                responsive: [{
                    breakpoint: 1600,
                    options: {
                        chart: {
                            height: 360
                        }
                    }
                }, {
                    breakpoint: 1199,
                    options: {
                        chart: {
                            height: 330
                        }
                    }
                }, {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 300
                        }
                    }
                }]
            };

            const persentSuccessChart = new ApexCharts(persentSuccessChartEl, persentSuccessChartConfig);
            persentSuccessChart.render();
        }

        document.getElementById('visitors').textContent = data.total_visitors
        document.getElementById('total-hits').textContent = data.total_hits
        document.getElementById('total-visitors').textContent = data.total_visitors
        document.getElementById('successful-requests').textContent = data.successful_requests
        document.getElementById('total-errors').textContent = data.errors
        document.getElementById('total-weekly').textContent = Object.values(data.weekly).reduce((a, b) => a + b, 0);

        function identifyDevice(userAgent) {
            if (/axios/i.test(userAgent)) return 'axios';
            if (/fetch/i.test(userAgent)) return 'fetch';
            if (/android/i.test(userAgent)) return 'android';
            if (/iphone|ipod/i.test(userAgent)) return 'iPhone';
            if (/ipad/i.test(userAgent)) return 'iPad';
            if (/windows phone/i.test(userAgent)) return 'windows';
            if (/macintosh/i.test(userAgent)) return 'mac';
            if (/linux/i.test(userAgent)) return 'linux';
            if (/windows/i.test(userAgent)) return 'windows';
            if (/chrome/i.test(userAgent)) return 'chrome';
            if (/firefox/i.test(userAgent)) return 'firefox';
            if (/safari/i.test(userAgent)) return 'safari';
            if (/edge/i.test(userAgent)) return 'edge';
            if (/opera/i.test(userAgent)) return 'opera';
            if (/msie|trident/i.test(userAgent)) return 'browser';
            return 'fetch';
        }

        function percentage(total, success) {
            if (total === 0) return 0;
            return ((success / total) * 100).toFixed(2);
        }

        function generateUsageList(usage) {
            const listUsageContainer = document.getElementById('usage-list');
            if (!listUsageContainer || !usage) return console.error("tidak ada element");
            listUsageContainer.innerHTML = ''; // Kosongkan konten sebelum menambahkan yang baru
        
            usage.forEach((usagecmd) => {
                const listItem = document.createElement('li');
                listItem.classList.add('d-flex', 'mb-4', 'align-items-center', 'pb-2');
        
                const iconDiv = document.createElement('div');
                iconDiv.classList.add('flex-shrink-0', 'me-4');
        
                const iconBg = document.createElement('div');
                iconBg.classList.add(usagecmd.status ? 'bg-label-success' : 'bg-label-danger', 'rounded', 'shadow-xs', 'p-2', 'd-flex', 'align-items-center', 'justify-content-center');
        
                const icon = document.createElement('i');
                icon.classList.add('icon-base', 'ri', usagecmd.status ? 'ri-checkbox-circle-line' : 'ri-bug-line', 'ri-24px');
                iconBg.appendChild(icon);
                iconDiv.appendChild(iconBg);
        
                const contentDiv = document.createElement('div');
                contentDiv.classList.add('d-flex', 'w-100', 'flex-wrap', 'align-items-center', 'justify-content-between', 'gap-2');
        
                const textDiv = document.createElement('div');
                textDiv.classList.add('me-2');
        
                const title = document.createElement('h6');
                title.classList.add('mb-1');
                title.textContent = usagecmd.command;
        
                const timestamp = document.createElement('small');
                timestamp.classList.add('d-flex', 'align-items-center');
                timestamp.innerHTML = `<i class="icon-base ri ri-calendar-line ri-14px"></i><span class="ms-2">${usagecmd.timestamp}</span>`;
        
                textDiv.appendChild(title);
                textDiv.appendChild(timestamp);
        
                const statusDiv = document.createElement('div');
                statusDiv.classList.add('badge', usagecmd.status ? 'bg-label-success' : 'bg-label-danger', 'rounded-pill');
                statusDiv.textContent = identifyDevice(usagecmd.device) || "iPhone";
        
                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(statusDiv);
        
                listItem.appendChild(iconDiv);
                listItem.appendChild(contentDiv);
        
                listUsageContainer.appendChild(listItem);
            });
        }
        
        function generateErrorList(errors) {
            const listErrorsContainer = document.getElementById('error-list');
            if (!listErrorsContainer || !errors) return console.error("tidak ada element");
            listErrorsContainer.innerHTML = ''; // Kosongkan konten sebelum menambahkan yang baru
        
            errors.forEach((error) => {
                const listItem = document.createElement('li');
                listItem.classList.add('d-flex', 'mb-4', 'align-items-center', 'pb-2');
        
                const iconDiv = document.createElement('div');
                iconDiv.classList.add('flex-shrink-0', 'me-4');
        
                const iconBg = document.createElement('div');
                iconBg.classList.add('bg-danger', 'rounded', 'shadow-xs', 'p-2', 'd-flex', 'align-items-center', 'justify-content-center');
        
                const icon = document.createElement('i');
                icon.classList.add('icon-base', 'ri', 'ri-bug-line', 'ri-24px');
                iconBg.appendChild(icon);
                iconDiv.appendChild(iconBg);
        
                const contentDiv = document.createElement('div');
                contentDiv.classList.add('d-flex', 'w-100', 'flex-wrap', 'align-items-center', 'justify-content-between', 'gap-2');
        
                const textDiv = document.createElement('div');
                textDiv.classList.add('me-2');
        
                const title = document.createElement('h6');
                title.classList.add('mb-1');
                title.textContent = error.command;
        
                const timestamp = document.createElement('small');
                timestamp.classList.add('d-flex', 'align-items-center');
                timestamp.innerHTML = `<i class="icon-base ri ri-calendar-line ri-14px"></i><span class="ms-2">${error.timestamp}</span>`;
        
                textDiv.appendChild(title);
                textDiv.appendChild(timestamp);
        
                const statusDiv = document.createElement('div');
                statusDiv.classList.add('badge', 'bg-label-danger', 'rounded-pill');
                statusDiv.textContent = identifyDevice(error.device) || "iPhone";
        
                contentDiv.appendChild(textDiv);
                contentDiv.appendChild(statusDiv);
        
                listItem.appendChild(iconDiv);
                listItem.appendChild(contentDiv);
        
                listErrorsContainer.appendChild(listItem);
            });
        }
        
        if (data.latestErrors) generateErrorList(data.latestErrors);
        if (data.latestCommands) generateUsageList(data.latestCommands);
        
    } catch (error) {
        console.error('Error fetching or updating data:', error);
    }
})();