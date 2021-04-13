@extends('layouts.app')

@section('title')
<title>monGro - Connect4</title>
@endsection
@section('description')
<meta name="description" content="Play Connect4 against a friend or a computer.">
@endsection

@section('scripts')
<script src="{{ mix('/js/app.js') }}" defer></script>
@endsection

@section('page')
<div id="react-app">
</div>
@endsection
 