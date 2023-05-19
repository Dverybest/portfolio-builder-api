export const verifyAccountMail = (name: string, token: string) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.cdnfonts.com/css/campton" rel="stylesheet"></link>
    <title>Confirm Code</title>
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
            padding-top: 0;
            margin-top: 0;
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
            <p>Hi ${name},</p>

            <p>
                Ready to start using your new CVP account? Copy and
                paste the following security code into the space provided in your 
                browser.
            </p>

            <p>
               The verification code is: ${token}
            </div>

        

        </div>
    
        <div style="
        width: 500px;
        left: 40px;
        padding-top: 20px;
        margin: 0 auto;" class="footerText">
            <p style="font-weight: 400;
            font-size: 14px;
            line-height: 20px;">
                Questions or concerns? Get in touch with us at <span style="color: #6941C6;">hello@CVP.com</span> or <span style="color: #6941C6;">join our
                Slack community.</span> Never miss a beat! Follow us on <span style="color: #6941C6;">Instagram</span>  
                and <span>Twitter.</span>
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
