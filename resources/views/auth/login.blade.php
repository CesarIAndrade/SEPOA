<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{asset ('css/style.css')}}">
    <title>Iniciar Sesión</title> <!-- Bootstrap -->
    <link href="{{asset ('vendors/bootstrap/dist/css/bootstrap.min.css')}}" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="{{asset ('vendors/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">
    <!-- NProgress -->
    <link href="{{asset ('vendors/nprogress/nprogress.css')}}" rel="stylesheet">
    <!-- Animate.css -->
    <link href="{{asset ('vendors/animate.css/animate.min.css')}}" rel="stylesheet">
    <!-- Custom Theme Style -->
    <link href="{{asset ('build/css/custom.min.css')}}" rel="stylesheet">
    
</head>

<body class="login">
    <div class="login_wrapper">
        <section class="login_content">
            <div class="loginStyle">
                <div class="profile_pic imgLoginStyle">
                    <img src="images/user.png" alt="..." class="img-circle profile_img">
                </div>
                <form method="POST" action="{{ route('login') }}">
                    {{ csrf_field() }}
                    <h1>Iniciar Sesión</h1>
                    <div>
                        <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}"
                            required autofocus>
                    </div>
                    <div>
                        <input id="password" type="password" class="form-control" name="password" required>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-warning submit btn-block">Iniciar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</body>
</html>