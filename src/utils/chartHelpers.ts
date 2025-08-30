import type { ChartOptions } from 'chart.js';

export class ChartHelpers {
  static getResponsiveOptions(): Partial<ChartOptions<'line'>> {
    return {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 30,
          right: 20,
          bottom: 20,
          left: 20
        }
      }
    };
  }

  static getMobileOptions(): Partial<ChartOptions<'line'>> {
    return {
      ...this.getResponsiveOptions(),
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          displayColors: false,
          titleFont: {
            size: 12
          },
          bodyFont: {
            size: 11
          }
        }
      },
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 6,
            precision: 0,
            font: {
              size: 10
            }
          }
        },
        y: {
          reverse: true, // 1位を上に表示
          ticks: {
            precision: 0,
            font: {
              size: 10
            }
          }
        }
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 6
        },
        line: {
          tension: 0.1,
          borderWidth: 2
        }
      }
    };
  }

  static getDesktopOptions(): Partial<ChartOptions<'line'>> {
    return {
      ...this.getResponsiveOptions(),
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          displayColors: true,
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          }
        }
      },
      scales: {
        x: {
          ticks: {
            precision: 0,
            font: {
              size: 12
            }
          }
        },
        y: {
          reverse: true, // 1位を上に表示
          ticks: {
            precision: 0,
            font: {
              size: 12
            }
          }
        }
      },
      elements: {
        point: {
          radius: 6,
          hoverRadius: 8
        },
        line: {
          tension: 0.1,
          borderWidth: 2
        }
      }
    };
  }

  static generateColorPalette(count: number): string[] {
    const colors = [
      '#FF69B4', '#FFB6C1', '#FFD700', '#9370DB', '#32CD32',
      '#000000', '#87CEEB', '#87CEFA', '#4169E1', '#000080',
      '#FFA500', '#00CED1', '#FF6347', '#98FB98', '#DDA0DD',
      '#F0E68C', '#FF7F50', '#6495ED', '#DC143C', '#00FA9A'
    ];

    if (count <= colors.length) {
      return colors.slice(0, count);
    }

    // Generate additional colors if needed
    const additionalColors = [];
    for (let i = colors.length; i < count; i++) {
      const hue = (i * 137.508) % 360; // Golden angle approximation
      additionalColors.push(`hsl(${hue}, 70%, 50%)`);
    }

    return [...colors, ...additionalColors];
  }

  static adjustColorOpacity(color: string, opacity: number): string {
    // Handle hex colors
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    // Handle rgb/rgba colors
    if (color.startsWith('rgb')) {
      return color.replace(/rgba?\(([^)]+)\)/, (_match, values) => {
        const [r, g, b] = values.split(',').map((v: string) => v.trim());
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      });
    }

    // Handle hsl colors
    if (color.startsWith('hsl')) {
      return color.replace(/hsla?\(([^)]+)\)/, (_match, values) => {
        const [h, s, l] = values.split(',').map((v: string) => v.trim());
        return `hsla(${h}, ${s}, ${l}, ${opacity})`;
      });
    }

    // Default: return as is
    return color;
  }

  static isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  static isTablet(): boolean {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  }

  static isDesktop(): boolean {
    return window.innerWidth > 1024;
  }

  static getOptimalChartOptions(width?: number): Partial<ChartOptions<'line'>> {
    const screenWidth = width || window.innerWidth;

    if (screenWidth <= 768) {
      return this.getMobileOptions();
    }

    return this.getDesktopOptions();
  }
}