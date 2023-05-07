<!DOCTYPE html>
<html>
<head>
    <title>Padlet Detail View</title>
</head>

<body>

<h1>{{ $padlet->name }}</h1>

<div>
    <p>Public: {{ $padlet->isPublic }}</p>
    <ul>
        @foreach($padlet->entries as $entry)
            <li>{{ $entry->text }}</li>
        @endforeach
    </ul>

    <br>
    <a href="/myPadlets">back to Padlet Overview</a>
</div>
</body>

</html>
