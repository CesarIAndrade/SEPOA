<div class="top_nav">
    <div class="nav_menu">
        <nav>
            <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li class=""><a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="images/img.jpg" alt="">{{ Auth::user()->name }}<input id="UserName" type="hidden" value="{{ Auth::user()->name }}"><span class=" fa fa-angle-down"></span></a>
                    <ul class="dropdown-menu dropdown-usermenu pull-right">
                        <li><a href="javascript:;">Profile</a></li>
                        <li><a href="javascript:;"><span class="badge bg-red pull-right">50%</span>
                        <span>Settings</span></a></li>
                        <li><a href="javascript:;">Help</a></li>
                        <li><a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i class="fa fa-sign-out pull-right"></i>{{ __('Salir') }}</a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>
                        </li>
                    </ul>
                </li>
                <li role="presentation" class="dropdown"><a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-envelope-o"></i><span class="badge bg-green" id="numeroNotificaciones"></span></a>
                    <ul id="notificaciones" class="dropdown-menu list-unstyled msg_list" role="menu"></ul>
                </li>
            </ul>
        </nav>
    </div>
</div>

<script src="js/notificaciones.js"></script>