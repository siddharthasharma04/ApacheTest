(
    function(browser){
        var $ = $ || browser.$;

        function Shell(){
            var self = this;
            this.getApiData = function(apiURL, callback){
                var cb = callback || function(){}
                $.get(apiURL, function(data){
                    browser.AllData = data;
                    cb(data);
                });
            }

            this.renderApp = function(data,container){
                var rnd = browser.render || new RenderUI();
                return data.map(function(_dt){
                    return rnd.getAcordian(_dt);
                }).forEach(element => {
                   container.append(element); 
                });
            }            
        }

        function RenderUI(){
            var self = this;
            
            this.getAcordian = function(obj){
                return "<div class='accordian closed' onclick='render.accordianClickHandler(event)'>" 
                           +"<div class='heading'><h5>"+obj.name+"</h5></div>"
                           +"<div class='body'>"+self.getChildAcordian(obj.data)+"</div>"
                        +"</div>";
            }

            this.getChildAcordian = function (obj){
                str ="";
                for(element in obj){
                    if(obj[element].data){
                        str += self.getAcordian(obj[element]);
                    }
                    else{
                        return self.getAcordianBody(obj);
                    }
                };

                return str;
            }

            this.getAcordianBody = function(obj){
                var str =  "<div class='accordian-body'>";
                            for(element in obj ) {
                                str +="<div class='content'>"+
                                    self.getUnorderList(obj[element])
                                +"</div>";
                            };
                        str+="</div>"
                return str;
            }

            this.getUnorderList = function (obj){
                var str = "<ul>"
                for(dt in obj){
                    str+="<li><span class='text-normal'>"+dt +"</span> : "+obj[dt]+"</li>";
                }
                str+="</ul>"
                return str;
            }

            // Handlers

            this.accordianClickHandler = function (e){
                $('.accordian').addClass('closed');
                $(e.target).parents('.accordian').toggleClass('closed opened');
            }

            $(document).on('.accordian > h5','click',self.accordianClickHandler);
        }

        browser.render = new RenderUI();

        browser.Shell = new Shell();
    }
)(window);