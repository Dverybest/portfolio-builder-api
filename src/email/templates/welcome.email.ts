export const welcomeEmail = (context: { username: string; appUrl: string }) => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.cdnfonts.com/css/campton" rel="stylesheet"></link>
    <title>Welcome to CVP</title>
  </head>

  <body>
    <div style="background: #f9f5ff;
    width: 600px;
    padding: 32px;
    margin: 0 auto;
    gap: 8px;
    left: 24716px;
    top: 19955px;" class="mainContainer">
        <div style="background: #fff;
        padding: 40px;
        width: 520px;" class="boxContainer">
        <h1 style="color: #7f56d9;
        padding-bottom: 20px;
        margin-top: 0;
        padding-top: 0;
        height: 16px;
        font-size: 24px;">C V P</h1>
            <h2 style="font-weight: 500;
            font-size: 24px;
            line-height: 32px;
            padding-bottom: 20px;">Welcome</h2>

            <div style="width: 500px;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            padding-bottom: 20px;" class="textBox">
            <p>Hi ${context.username},</p>

            <p>
                Welcome to the community! Did you know that over 1,000+ people use
                their CVP every day? It's a great day to build that winning CV and
                Portfolio.
            </p>

            <p>
                What are you going to do with yours? Follow the link below to create
                your very first CV or Portfolio and join thousands of other users
                around the globe!
            </p>
            </div>

            <button style=" padding: 10px 18px; 
            background: #7f56d9; 
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05); 
            border-radius: 8px;
            border: 1px solid #7f56d9;  
            outline: none; 
            width: 143px; 
            height: 44px;"><a style="text-decoration: none;
            color: #fff;" href="${context.appUrl}">Start Building</a></button>

        </div>
        <div style="height: 74px;
        width: 500px;
        left: 40px;
        padding-top: 20px;
        margin: 0 auto;" class="footerText">
            <p style="font-weight: 400;
            font-size: 14px;
            line-height: 20px;">
                Questions or concerns? Get in touch with us at <span style="color: #6941C6;">hello@CVP.com</span> or <span>join our
                Slack community.</span> Never miss a beat! Follow us on <span style="color: #6941C6;">Instagram</span>  
                and <span style="color: #6941C6;">Twitter.</span>
            </p>

            <p style="font-weight: 400;
            font-size: 14px;
            line-height: 20px;">Don't want any more emails from CVP? <span>Unsubscribe</span></p>
        </div>

    </div>
  </body>
</html>
    `;
};
