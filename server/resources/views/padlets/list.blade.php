<!DOCTYPE html>
<html>
<head>
    <title>Hanna's PadleMania</title>
</head>

<body>
    <h1>All Public Padlets</h1>
    <ul>
        @foreach($padlets as $padlet)
            <li><a href="padlets/{{ $padlet->id }}">{{ $padlet->name }}</a></li>
        @endforeach
    </ul>
</body>
</html>
