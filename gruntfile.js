const { set } = require("grunt");

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{
            development:{
                files:{
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production:{
                options:{
                    compress: true,
                },
                files:{
                    'dist/styles/main.css': 'src/styles/main.less'
                }
            }
        },
        watch:{
            less:{
                files:['src/styles/**/*.less'],
                tasks:['less:development'],
            },
            html:{
                files:['src/index.html'],
                tasks:['replace:dev'],
            }
        },
        replace:{
            dev:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement:'./styles/main.css'
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement:'../src/scripts/main.js'
                        }
                    ]
                }
            },
            dist:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement:'./styles/main.min.css'
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement:'./scripts/main.min.js'
                        }
                    ]
                }
            },
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files:{
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean:['prebuild',],
        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Register tasks
    grunt.registerTask('default', ['watch',]);
    grunt.registerTask('build',['less:production','replace:dist','htmlmin','uglify','clean',]);
}